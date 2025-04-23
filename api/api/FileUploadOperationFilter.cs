using Microsoft.AspNetCore.Http;

namespace api;

using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

public class FileUploadOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var formFileParams = context.MethodInfo
            .GetParameters()
            .Where(p => p.ParameterType == typeof(IFormFile) || p.ParameterType.IsAssignableTo(typeof(IFormFile)))
            .ToList();

        if (!formFileParams.Any()) return;

        operation.RequestBody = new OpenApiRequestBody
        {
            Content =
            {
                ["multipart/form-data"] = new OpenApiMediaType
                {
                    Schema = new OpenApiSchema
                    {
                        Type = "object",
                        Properties = context.ApiDescription.ParameterDescriptions.ToDictionary(
                            p => p.Name,
                            p => new OpenApiSchema
                            {
                                Type = p.Type == typeof(IFormFile) ? "string" : "string",
                                Format = p.Type == typeof(IFormFile) ? "binary" : null
                            }
                        ),
                        Required = context.ApiDescription.ParameterDescriptions
                            .Where(p => p.IsRequired)
                            .Select(p => p.Name)
                            .ToHashSet()
                    }
                }
            }
        };
    }
}
