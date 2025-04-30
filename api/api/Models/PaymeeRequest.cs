using System.Text.Json.Serialization;

namespace api.Models;

public class PaymeeRequest
{
    [JsonPropertyName("amount")]
    public decimal Amount { get; set; }

    [JsonPropertyName("note")]
    public string Note { get; set; }

    [JsonPropertyName("first_name")]
    public string FirstName { get; set; }

    [JsonPropertyName("last_name")]
    public string LastName { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("phone")]
    public string Phone { get; set; }

    [JsonPropertyName("return_url")]
    public string ReturnUrl { get; set; }

    [JsonPropertyName("cancel_url")]
    public string CancelUrl { get; set; }

    [JsonPropertyName("webhook_url")]
    public string WebhookUrl { get; set; }

    [JsonPropertyName("order_id")]
    public string OrderId { get; set; } // Your internal ID to link payment to temp cart
}
