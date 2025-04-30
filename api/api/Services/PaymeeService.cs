using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace api.Services;

public class PaymeeService: IPaymentService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;
    private readonly ILogger<PaymeeService> _logger;

    public PaymeeService(IHttpClientFactory httpClientFactory, IConfiguration config,  ILogger<PaymeeService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _config = config;
        _logger = logger;
    }

    public async Task<string> CreatePaymentSessionAsync(PaymeeRequest request)
    {
        var client = _httpClientFactory.CreateClient();
        //client.BaseAddress = new Uri(_config["Paymee:BaseUrl"]);
    
        // Check if API key is properly formatted (might need "Bearer " prefix)
        var apiKey = _config["Paymee:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new Exception("Paymee API key is not configured");
        }
    
        client.DefaultRequestHeaders.Add("Authorization", $"Token { _config["Paymee:ApiKey"]}");
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var jsonContent = JsonSerializer.Serialize(request);
        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        // Log the request for debugging
        _logger.LogInformation($"Sending request to Paymee: {jsonContent}");

        try
        {
            var response = await client.PostAsync("https://sandbox.paymee.tn/api/v2/payments/create", content); // try without leading slash
        
            // Read as string first for better error messages
            var responseBody = await response.Content.ReadAsStringAsync();
        
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"Paymee API error: {response.StatusCode} - {responseBody}");
                throw new Exception($"Paymee error: {response.StatusCode} - {responseBody}");
            }

            var result = JsonSerializer.Deserialize<PaymeeResponse>(responseBody);
            return result.Data.PaymentUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Paymee API");
            throw;
        }
    }
}
