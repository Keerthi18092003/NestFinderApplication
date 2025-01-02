import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PropertyService } from '../../services/property.service';


@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  properties: any[] = [];
  errorMessage: string = '';
  constructor(private router: Router, private propertyService: PropertyService) { }
  ngOnInit(): void {
    this.loadProperties();
  }
  loadProperties(): void {
    this.propertyService.getProperties().subscribe(
      (data) => {
        this.properties = data;
        console.log('Properties:', this.properties);
      },
      (error) => {
        this.errorMessage = 'Error fetching property listings.';
        console.error(error);
      }
    );
  }
  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  sendEmail(): void {
    window.location.href = 'mailto:nestfinderinfo@gmail.com';
  }

  faqModalOpen = false;
  faqs = [ // List of FAQs
    {
      id: 1,
      category: 'General Questions',
      question: 'What is NestFinder?',
      answer: 'NestFinder is a platform that connects property owners and tenants to simplify property renting.',
      open: false
    },
    {
      id: 2,
      category: 'General Questions',
      question: 'How do I create an account?',
      answer: 'To create an account, click on "Sign Up" and fill in the required details.',
      open: false
    },
    {
      id: 3,
      question: 'Is NestFinder free to use?',
      answer: 'Yes, NestFinder is free for tenants.We are happy to provide services at free of cost.',
      open: false
    },
    {
      id: 5,
      question: 'Can I contact property owners directly?',
      answer: 'Yes.You can communicate with owners via platform only after the acceptance of your application.',
      open: false
    },
    {
      id: 6,
      question: 'How do I know if my application has been accepted?',
      answer: 'You will receive an email notification and can also check the status of your application in the "Application Status" section of your account.',
      open: false
    },

    {
      id: 4,
      category: 'For Tenants',
      question: 'How do I search for properties?',
      answer: 'You can search for properties using filters such as location,and type on the tenantpage after login.',
      open: false
    },
    {
      id: 7,
      category: 'For Property Owners',
      question: 'How do I list my property?',
      answer: 'To list your property, log in, navigate to RentOut and move to "Add Listing," and fill out the listing details.',
      open: false
    },
    {
      id: 8,
      question: 'What details are required to create a property listing?',
      answer: 'You will need the property type, location, price, photos, and a detailed description to create a listing.',
      open: false
    },
    {
      id: 9,
      question: 'How do I manage applications for my property?',
      answer: 'Go to the "View Listings" section, select the property, and review or accept applications submitted by tenants.',
      open: false
    },

    {
      id: 10,
      question: 'Who can see my property listing or application details?',
      answer: 'Property listings are visible to all users. Application details are only accessible to the property owner and the applicant.',
      open: false
    },
    {
      id: 11,
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team through the "Contact Us" form on the website or email us at support@nestfinder.com.',
      open: false
    }

  ];

  
  openFaqModal(): void {
    this.faqModalOpen = true;
  }

  closeFaqModal(): void {
    this.faqModalOpen = false;
  }

  toggleFaq(id: number): void {
    this.faqs = this.faqs.map(faq => ({
      ...faq,
      open: faq.id === id ? !faq.open : faq.open,
    }));
  }
  termsModalOpen = false;

  openTermsModal(): void {
    this.termsModalOpen = true;
  }

  closeTermsModal(): void {
    this.termsModalOpen = false;
  }


}
