using System.Text.Json.Serialization;

namespace api.Models;

public class PaymeeResponse
{
    [JsonPropertyName("result")]
    public string Result { get; set; }

    [JsonPropertyName("data")]
    public PaymeeResponseData Data { get; set; }
}

public class PaymeeResponseData
{
    [JsonPropertyName("token")]
    public string Token { get; set; }

    [JsonPropertyName("payment_url")]
    public string PaymentUrl { get; set; }
}
