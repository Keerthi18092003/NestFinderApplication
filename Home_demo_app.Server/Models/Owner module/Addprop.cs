using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Home_demo_app.Server.Models
{
	public class Addprop
	{
		[Key]
		public Guid PropertyId { get; set; }

		[Required(ErrorMessage = "Property type is required")]
		public required string PropertyType { get; set; }

		[Required(ErrorMessage = "Price is required")]
		[Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number")]
		public required int Price { get; set; }

		[Required(ErrorMessage = "Street is required")]
		[MaxLength(100, ErrorMessage = "Street name can't exceed 100 characters")]
		public required string Street { get; set; }

		[Required(ErrorMessage = "City is required")]
		[MaxLength(50, ErrorMessage = "City name can't exceed 50 characters")]
		public required string City { get; set; }

		[Required(ErrorMessage = "Pincode is required")]
		[RegularExpression(@"^\d{6}$", ErrorMessage = "Pincode must be a 6-digit number")]
		public required string Pincode { get; set; }

		[MaxLength(1000, ErrorMessage = "Description can't exceed 1000 characters")]
		public required string Description { get; set; }

		[MaxLength(500, ErrorMessage = "Rental terms can't exceed 500 characters")]
		public string? RentalTerms { get; set; }

		[Required(ErrorMessage = "Furnished status is required")]
		public required string Furnished { get; set; }

		[Required(ErrorMessage = "Number of bedrooms is required")]
		[Range(1, int.MaxValue, ErrorMessage = "Bedrooms must be at least 1")]
		public required int Bedrooms { get; set; }

		[Required(ErrorMessage = "Number of rooms is required")]
		[Range(1, int.MaxValue, ErrorMessage = "Rooms must be at least 1")]
		public required int Rooms { get; set; }

		[Required(ErrorMessage = "Area is required")]
		[Range(100, int.MaxValue, ErrorMessage = "Area must be at least 100")]
		public required int Area { get; set; }

		[Required(ErrorMessage = "Mobile number is required")]
		[RegularExpression(@"^\d{10}$", ErrorMessage = "Mobile number must be a 10-digit number")]
		public required string MobileNumber { get; set; }

		[Required(ErrorMessage = "At least one image is required")]
		public required List<string> Images { get; set; } // List of base64 image strings

	}

}
