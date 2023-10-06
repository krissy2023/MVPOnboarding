using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MVPOnboarding.Models;

public partial class Sale
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public int? CustomerId { get; set; }

    public int? StoreId { get; set; }

    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode=true)]
    [DataType(DataType.Date)]
    public DateTime? DateSold { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Store? Store { get; set; }
}
