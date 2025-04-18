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
        return $@"
            <h1>Thank you for your order!</h1>
            <p>Order #: {order.Id}</p>
            <p>Date: {order.OrderDate:g}</p>
            <p>Total: {order.Total:C}</p>
            <h2>Items:</h2>
            <ul>
                {string.Join("", order.OrderItems.Select(i =>
                    $"<li>{i.Product?.Name} - {i.Quantity} x {i.Price:C}</li>"))}
            </ul>
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
