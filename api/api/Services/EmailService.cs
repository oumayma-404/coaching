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
        var subject = $"Order Confirmation - Order #{order.Id}";
        var textContent = $"Thank you for your order #{order.Id}. Total: {order.Total:F2} DT";
        var htmlContent = BuildOrderConfirmationHtml(order);

        await SendEmailAsync(email, subject, textContent, htmlContent);
    }

    public async Task SendOrderStatusUpdateAsync(string email, Order order)
    {
        var subject = $"Order Update - Order #{order.Id}";
        var textContent = $"Your order #{order.Id} status has been updated to: {order.Status}.";
        var htmlContent = BuildOrderStatusUpdateHtml(order);

        await SendEmailAsync(email, subject, textContent, htmlContent);
    }

    public async Task SendOrderToDeliveryAsync(Order order)
    {
        var deliveryEmail = _config["DeliverySettings:Email"];
        
        if (string.IsNullOrEmpty(deliveryEmail))
        {
            _logger.LogWarning("Delivery email not configured. Order #{OrderId} notification not sent.", order.Id);
            return;
        }

        var subject = $"🚚 NEW ORDER #{order.Id} - {order.CustomerName}";
        var textContent = BuildDeliveryTextContent(order);
        var htmlContent = BuildDeliveryHtml(order);

        await SendEmailAsync(deliveryEmail, subject, textContent, htmlContent);
    }

    private async Task SendEmailAsync(string toEmail, string subject, string textContent, string htmlContent)
    {
        var apiKey = _config["Mailjet:ApiKey"];
        var apiSecret = _config["Mailjet:ApiSecret"];
        var fromEmail = _config["EmailSettings:FromEmail"];
        var fromName = _config["EmailSettings:FromName"] ?? "Sports Coach";

        if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
        {
            _logger.LogWarning("Mailjet API credentials not configured. Email not sent to {Email}", toEmail);
            return;
        }

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
            _logger.LogError("Failed to send email to {Email}. Status: {Status}. Body: {Body}", 
                toEmail, response.StatusCode, responseBody);
        }
        else
        {
            _logger.LogInformation("Email sent successfully to {Email}", toEmail);
        }
    }

    private string BuildDeliveryTextContent(Order order)
    {
        var sb = new StringBuilder();
        sb.AppendLine("NEW ORDER RECEIVED");
        sb.AppendLine("==================");
        sb.AppendLine();
        sb.AppendLine($"Order #: {order.Id}");
        sb.AppendLine($"Date: {order.OrderDate:dd/MM/yyyy HH:mm}");
        sb.AppendLine();
        sb.AppendLine("CUSTOMER:");
        sb.AppendLine($"  Name: {order.CustomerName}");
        sb.AppendLine($"  Phone: {order.CustomerPhone}");
        sb.AppendLine($"  Email: {order.CustomerEmail}");
        sb.AppendLine();
        sb.AppendLine("DELIVERY ADDRESS:");
        sb.AppendLine($"  {order.ShippingAddress}");
        sb.AppendLine();
        sb.AppendLine("ORDER ITEMS:");
        
        foreach (var item in order.OrderItems)
        {
            var productName = item.Product?.Name ?? $"Product #{item.ProductId}";
            sb.AppendLine($"  - {productName} x{item.Quantity} = {(item.Quantity * item.Price):F2} DT");
        }
        
        sb.AppendLine();
        sb.AppendLine($"TOTAL: {order.Total:F2} DT");

        return sb.ToString();
    }

    private string BuildDeliveryHtml(Order order)
    {
        var brandColor = "#003942";
        var bgColor = "#f4efe8";
        var urgentColor = "#dc3545";
        
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: {bgColor};'>
    <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='max-width: 600px; margin: 0 auto; background-color: #ffffff;'>
        <!-- Header -->
        <tr>
            <td style='padding: 25px 40px; background-color: {urgentColor}; text-align: center;'>
                <h1 style='color: #ffffff; margin: 0; font-size: 24px;'>🚚 NEW ORDER RECEIVED</h1>
            </td>
        </tr>
        
        <!-- Order Info -->
        <tr>
            <td style='padding: 30px 40px;'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: {bgColor}; border-radius: 8px;'>
                    <tr>
                        <td style='padding: 20px;'>
                            <h2 style='color: {brandColor}; margin: 0 0 15px 0; font-size: 20px;'>Order #{order.Id}</h2>
                            <p style='color: #666666; margin: 0;'>📅 {order.OrderDate:dddd, dd MMMM yyyy à HH:mm}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Customer Details -->
        <tr>
            <td style='padding: 0 40px 20px 40px;'>
                <h3 style='color: {brandColor}; margin: 0 0 15px 0; font-size: 16px;'>👤 Customer Information</h3>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: #ffffff; border: 2px solid {brandColor}; border-radius: 8px;'>
                    <tr>
                        <td style='padding: 20px;'>
                            <p style='margin: 0 0 10px 0;'><strong style='color: {brandColor};'>Name:</strong> <span style='font-size: 18px;'>{order.CustomerName}</span></p>
                            <p style='margin: 0 0 10px 0;'><strong style='color: {brandColor};'>Phone:</strong> <a href='tel:{order.CustomerPhone}' style='font-size: 18px; color: {urgentColor}; text-decoration: none; font-weight: bold;'>{order.CustomerPhone}</a></p>
                            <p style='margin: 0;'><strong style='color: {brandColor};'>Email:</strong> <a href='mailto:{order.CustomerEmail}' style='color: #666666;'>{order.CustomerEmail}</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Delivery Address -->
        <tr>
            <td style='padding: 0 40px 20px 40px;'>
                <h3 style='color: {brandColor}; margin: 0 0 15px 0; font-size: 16px;'>📍 Delivery Address</h3>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;'>
                    <tr>
                        <td style='padding: 15px 20px;'>
                            <p style='margin: 0; color: #856404; font-size: 16px;'>{order.ShippingAddress}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Order Items -->
        <tr>
            <td style='padding: 0 40px 20px 40px;'>
                <h3 style='color: {brandColor}; margin: 0 0 15px 0; font-size: 16px;'>🛒 Order Items</h3>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='border-collapse: collapse;'>
                    <tr style='background-color: {brandColor};'>
                        <th style='padding: 12px; text-align: left; color: #ffffff; font-size: 14px;'>Product</th>
                        <th style='padding: 12px; text-align: center; color: #ffffff; font-size: 14px;'>Qty</th>
                        <th style='padding: 12px; text-align: right; color: #ffffff; font-size: 14px;'>Price</th>
                    </tr>
                    {string.Join("", order.OrderItems.Select(item => $@"
                    <tr>
                        <td style='padding: 12px; border-bottom: 1px solid #eeeeee; color: #333333; font-weight: 500;'>{item.Product?.Name ?? $"Product #{item.ProductId}"}</td>
                        <td style='padding: 12px; border-bottom: 1px solid #eeeeee; color: #666666; text-align: center;'>{item.Quantity}</td>
                        <td style='padding: 12px; border-bottom: 1px solid #eeeeee; color: #333333; text-align: right; font-weight: 500;'>{(item.Quantity * item.Price):F2} DT</td>
                    </tr>"))}
                </table>
            </td>
        </tr>
        
        <!-- Total -->
        <tr>
            <td style='padding: 0 40px 30px 40px;'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: {brandColor}; border-radius: 8px;'>
                    <tr>
                        <td style='padding: 20px;'>
                            <table role='presentation' width='100%' cellspacing='0' cellpadding='0'>
                                <tr>
                                    <td style='color: #ffffff; font-size: 18px;'>💰 Amount to Collect:</td>
                                    <td style='color: #ffffff; font-size: 28px; font-weight: bold; text-align: right;'>{order.Total:F2} DT</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style='padding: 20px 40px; background-color: {bgColor}; text-align: center;'>
                <p style='color: #999999; font-size: 12px; margin: 0;'>This is an automated notification from Sports Coach</p>
            </td>
        </tr>
    </table>
</body>
</html>";
    }

    private string BuildOrderConfirmationHtml(Order order)
    {
        var logoUrl = _config["EmailSettings:LogoUrl"] ?? "";
        var brandColor = "#003942";
        var bgColor = "#f4efe8";
        
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Order Confirmation #{order.Id}</title>
</head>
<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: {bgColor};'>
    <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='max-width: 600px; margin: 0 auto; background-color: #ffffff;'>
        <!-- Header -->
        <tr>
            <td style='padding: 30px 40px; background-color: {brandColor}; text-align: center;'>
                {(string.IsNullOrEmpty(logoUrl) ? "" : $"<img src='{logoUrl}' alt='Sports Coach' style='max-width: 150px; height: auto; margin-bottom: 15px;'>")}
                <h1 style='color: #ffffff; margin: 0; font-size: 28px;'>Order Confirmed! ✓</h1>
            </td>
        </tr>
        
        <!-- Greeting -->
        <tr>
            <td style='padding: 30px 40px;'>
                <p style='color: {brandColor}; font-size: 16px; margin: 0 0 15px 0;'>
                    Dear <strong>{order.CustomerName}</strong>,
                </p>
                <p style='color: #666666; font-size: 16px; margin: 0 0 15px 0;'>
                    Thank you for your order! We've received your order and will process it shortly.
                </p>
                <p style='color: #666666; font-size: 16px; margin: 0;'>
                    Our delivery team will contact you at <strong>{order.CustomerPhone}</strong> to confirm delivery details.
                </p>
            </td>
        </tr>
        
        <!-- Order Details Box -->
        <tr>
            <td style='padding: 0 40px;'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: {bgColor}; border-radius: 8px;'>
                    <tr>
                        <td style='padding: 20px;'>
                            <table role='presentation' width='100%' cellspacing='0' cellpadding='0'>
                                <tr>
                                    <td style='padding-bottom: 10px;'>
                                        <strong style='color: {brandColor};'>Order Number:</strong>
                                        <span style='color: #666666;'> #{order.Id}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style='padding-bottom: 10px;'>
                                        <strong style='color: {brandColor};'>Order Date:</strong>
                                        <span style='color: #666666;'> {order.OrderDate:dd MMMM yyyy, HH:mm}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong style='color: {brandColor};'>Delivery Address:</strong>
                                        <span style='color: #666666;'> {order.ShippingAddress}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Order Items -->
        <tr>
            <td style='padding: 30px 40px;'>
                <h2 style='color: {brandColor}; font-size: 20px; margin: 0 0 20px 0;'>Order Items</h2>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='border-collapse: collapse;'>
                    <tr style='background-color: {bgColor};'>
                        <th style='padding: 12px; text-align: left; color: {brandColor}; font-size: 14px;'>Item</th>
                        <th style='padding: 12px; text-align: center; color: {brandColor}; font-size: 14px;'>Qty</th>
                        <th style='padding: 12px; text-align: right; color: {brandColor}; font-size: 14px;'>Price</th>
                    </tr>
                    {string.Join("", order.OrderItems.Select(item => $@"
                    <tr>
                        <td style='padding: 15px 12px; border-bottom: 1px solid #eeeeee; color: #666666;'>{item.Product?.Name ?? $"Product #{item.ProductId}"}</td>
                        <td style='padding: 15px 12px; border-bottom: 1px solid #eeeeee; color: #666666; text-align: center;'>{item.Quantity}</td>
                        <td style='padding: 15px 12px; border-bottom: 1px solid #eeeeee; color: #666666; text-align: right;'>{(item.Quantity * item.Price):F2} DT</td>
                    </tr>"))}
                </table>
            </td>
        </tr>
        
        <!-- Total -->
        <tr>
            <td style='padding: 0 40px 30px 40px;'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: {brandColor}; border-radius: 8px;'>
                    <tr>
                        <td style='padding: 20px;'>
                            <table role='presentation' width='100%' cellspacing='0' cellpadding='0'>
                                <tr>
                                    <td style='color: #ffffff; font-size: 18px;'>Total Amount:</td>
                                    <td style='color: #ffffff; font-size: 24px; font-weight: bold; text-align: right;'>{order.Total:F2} DT</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Payment Note -->
        <tr>
            <td style='padding: 0 40px 30px 40px;'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;'>
                    <tr>
                        <td style='padding: 15px 20px;'>
                            <p style='color: #856404; margin: 0; font-size: 14px;'>
                                <strong>💵 Payment on Delivery</strong><br>
                                Please have the exact amount ready when our delivery person arrives.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style='padding: 30px 40px; background-color: {bgColor}; text-align: center;'>
                <p style='color: #999999; font-size: 14px; margin: 0 0 10px 0;'>
                    Questions about your order? Contact us at support@sportscoach.tn
                </p>
                <p style='color: #999999; font-size: 12px; margin: 0;'>
                    © {DateTime.Now.Year} Sports Coach. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>";
    }

    private string BuildOrderStatusUpdateHtml(Order order)
    {
        var brandColor = "#003942";
        var bgColor = "#f4efe8";
        var statusColor = order.Status switch
        {
            OrderStatus.Confirmed => "#28a745",
            OrderStatus.Processing => "#17a2b8",
            OrderStatus.Shipped => "#007bff",
            OrderStatus.Delivered => "#28a745",
            OrderStatus.Cancelled => "#dc3545",
            _ => brandColor
        };
        
        var statusEmoji = order.Status switch
        {
            OrderStatus.Confirmed => "✅",
            OrderStatus.Processing => "⚙️",
            OrderStatus.Shipped => "🚚",
            OrderStatus.Delivered => "📦",
            OrderStatus.Cancelled => "❌",
            _ => "📋"
        };

        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: {bgColor};'>
    <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='max-width: 600px; margin: 0 auto; background-color: #ffffff;'>
        <tr>
            <td style='padding: 30px 40px; background-color: {brandColor}; text-align: center;'>
                <h1 style='color: #ffffff; margin: 0; font-size: 24px;'>Order Update {statusEmoji}</h1>
            </td>
        </tr>
        <tr>
            <td style='padding: 40px;'>
                <p style='color: {brandColor}; font-size: 16px;'>Dear <strong>{order.CustomerName}</strong>,</p>
                <p style='color: #666666; font-size: 16px;'>Your order <strong>#{order.Id}</strong> has been updated.</p>
                
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='margin: 30px 0;'>
                    <tr>
                        <td style='padding: 20px; background-color: {bgColor}; border-radius: 8px; text-align: center;'>
                            <p style='margin: 0 0 10px 0; color: #666666;'>Current Status:</p>
                            <p style='margin: 0; font-size: 24px; font-weight: bold; color: {statusColor};'>{order.Status}</p>
                        </td>
                    </tr>
                </table>
                
                <p style='color: #666666; font-size: 14px;'>
                    If you have any questions, please don't hesitate to contact us.
                </p>
            </td>
        </tr>
        <tr>
            <td style='padding: 20px 40px; background-color: {bgColor}; text-align: center;'>
                <p style='color: #999999; font-size: 12px; margin: 0;'>© {DateTime.Now.Year} Sports Coach</p>
            </td>
        </tr>
    </table>
</body>
</html>";
    }
}
