using System;
using System.Collections.Generic;

namespace MVPOnboarding.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string? Name { get; set; } = string.Empty;

    public string? Address { get; set; } = string.Empty;

    
}
