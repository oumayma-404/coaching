using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace api.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;
    private readonly HttpClient _httpClient;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
        _httpClient = new HttpClient();
    }

    public async Task SendOrderConfirmationAsync(string email, Order order)
    {
        var subject = $"Your Order #{order.Id} Confirmation";
        var textContent = $"Thank you for your order #{order.Id}. Total: {order.Total:C}";
        var htmlContent = BuildOrderConfirmationHtml(order);

        await SendEmailAsync(email, subject, textContent, htmlContent);
    }

    public async Task SendOrderStatusUpdateAsync(string email, Order order)
    {
        var subject = $"Update on Your Order #{order.Id}";
        var textContent = $"Your order #{order.Id} status has been updated to: {order.Status}.";
        var htmlContent = BuildOrderStatusUpdateHtml(order);

        await SendEmailAsync(email, subject, textContent, htmlContent);
    }

    private async Task SendEmailAsync(string toEmail, string subject, string textContent, string htmlContent)
    {
        var apiKey = _config["Mailjet:ApiKey"];
        var apiSecret = _config["Mailjet:ApiSecret"];
        var fromEmail = _config["EmailSettings:FromEmail"];
        var fromName = "Sports Coach";

        var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{apiKey}:{apiSecret}"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);

        var body = new
        {
            Messages = new[]
            {
                new
                {
                    From = new { Email = fromEmail, Name = fromName },
                    To = new[] { new { Email = toEmail } },
                    Subject = subject,
                    TextPart = textContent,
                    HTMLPart = htmlContent
                }
            }
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("https://api.mailjet.com/v3.1/send", content);

        if (!response.IsSuccessStatusCode)
        {
            var responseBody = await response.Content.ReadAsStringAsync();
            _logger.LogError($"Failed to send email to {toEmail}. Status: {response.StatusCode}. Body: {responseBody}");
        }
    }

   private string BuildOrderConfirmationHtml(Order order)
{
    var logoUrl = _config["EmailSettings:LogoUrl"];
    
    return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Order Confirmation #{order.Id}</title>
    <style>
        body {{
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }}
        .header {{
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
            margin-bottom: 30px;
        }}
        .logo {{
            max-width: 150px;
            height: auto;
        }}
        .order-details {{
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }}
        .item-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }}
        .item-table th {{
            background: #f0f0f0;
            padding: 10px;
            text-align: left;
        }}
        .item-table td {{
            padding: 10px;
            border-bottom: 1px solid #eee;
        }}
        .total {{
            font-weight: bold;
            font-size: 1.2em;
            text-align: right;
        }}
        .footer {{
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 0.9em;
            color: #777;
            text-align: center;
        }}
    </style>
</head>
<body>
    <div class='header'>
        <img src='{logoUrl}' alt='Sports Coach Logo' class='logo'>
        <h1>Order Confirmation</h1>
    </div>
    
    <div class='order-details'>
        <p>Thank you for your order! Here are your order details:</p>
        <p><strong>Order #:</strong> {order.Id}</p>
        <p><strong>Date:</strong> {order.OrderDate:g}</p>
        <p><strong>Status:</strong> {order.Status}</p>
    </div>
    
    <h2>Order Items</h2>
    <table class='item-table'>
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            {string.Join("", order.OrderItems.Select(i => $@"
            <tr>
                <td>{i.Product?.Name}</td>
                <td>{i.Quantity}</td>
                <td>{i.Price:C}</td>
                <td>{(i.Quantity * i.Price):C}</td>
            </tr>"))}
        </tbody>
    </table>
    
    <div class='total'>
        <p><strong>Total: {order.Total:C}</strong></p>
    </div>
    
    <div class='footer'>
        <p>If you have any questions about your order, please contact us at support@sportscoach.com</p>
        <p>© {DateTime.Now.Year} Sports Coach. All rights reserved.</p>
    </div>
</body>
</html>
";
}

    private string BuildOrderStatusUpdateHtml(Order order)
    {
        return $@"
            <h1>Order Update</h1>
            <p>Your order #{order.Id} status has been updated.</p>
            <p><strong>Current Status:</strong> {order.Status}</p>
            <p>We will notify you when the next update is available.</p>
        ";
    }
}
