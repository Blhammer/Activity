using Application.Activities;
using Persistence.DataSeed;

var builder = WebApplication.CreateBuilder(args);

// add services to container

builder.Services.AddControllers(opt =>
    {
        var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        opt.Filters.Add(new AuthorizeFilter(policy));
    })
    .AddFluentValidation(config =>
    {
        config.RegisterValidatorsFromAssemblyContaining<Create>();
    });

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Configure the http request pipeline

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseXContentTypeOptions();
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());
app.UseCspReportOnly(opt => opt
    .BlockAllMixedContent()
    .StyleSources(s => s.Self().CustomSources(
        "https://fonts.googleapis.com",
        "sha256-DpOoqibK/BsYhobWHnU38Pyzt5SjDZuR/mFsAiVN7kk="
    ))
    .FontSources(s => s.Self().CustomSources(
        "https://fonts.gstatic.com", "data:", "blob:"
    ))
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ImageSources(s => s.Self().CustomSources(
        "https://res.cloudinary.com",
        "https://www.facebook.com",
        "https://platform-lookaside.fbsbx.com",
        "data:",
        "blob:",
        "img-src"
    ))
    .ScriptSources(s => s.Self().CustomSources(
        "https://connect.facebook.net",
        "sha256-bYpo2sNZ+qgSGj3NT3Cp3RfoTzduLPlS0hqHsXLP79U="
    ))
);

if (!app.Environment.IsDevelopment())
{
    // Create a middleware to add the header manually onto this
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

// Seed our data

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    await context.Database.MigrateAsync();

    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();

    logger.LogError(ex, "An error occurred during migration!");
}

await app.RunAsync();