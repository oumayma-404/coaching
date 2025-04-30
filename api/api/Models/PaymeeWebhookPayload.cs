using System.Text.Json.Serialization;

namespace api.Models;

public class PaymeeWebhookPayload
{
    [JsonPropertyName("order_id")]
    public string OrderId { get; set; }

    [JsonPropertyName("payment_id")]
    public string PaymentId { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; } // "paid", "cancelled", etc.

    [JsonPropertyName("amount")]
    public decimal Amount { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("first_name")]
    public string FirstName { get; set; }

    [JsonPropertyName("last_name")]
    public string LastName { get; set; }

    [JsonPropertyName("phone")]
    public string Phone { get; set; }
}
