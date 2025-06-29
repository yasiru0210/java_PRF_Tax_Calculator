# Tax Calculator Web Application

A comprehensive web-based tax calculator built with Spring Boot and Thymeleaf, designed to help users calculate various types of taxes and leasing payments according to Sri Lankan tax regulations.

## Features

### 🏠 **Withholding Tax Calculator**
- **Rent Tax**: Calculate tax on rental payments above Rs. 100,000 (10% on excess amount)
- **Bank Interest Tax**: Calculate 5% tax on annual bank interest
- **Dividend Tax**: Progressive tax calculation on dividend income with multiple brackets

### 💰 **Payable Tax Calculator**
Calculate monthly salary tax using progressive tax brackets:
- Up to Rs. 100,000: No tax
- Rs. 100,001 - Rs. 141,667: 6%
- Rs. 141,668 - Rs. 183,333: 12%
- Rs. 183,334 - Rs. 225,000: 18%
- Rs. 225,001 - Rs. 266,667: 24%
- Rs. 266,668 - Rs. 308,333: 30%
- Above Rs. 308,333: 36%

### 📊 **Income Tax Calculator**
Calculate annual income tax with progressive brackets:
- Up to Rs. 1,200,000: No tax
- Rs. 1,200,001 - Rs. 1,700,000: 6%
- Rs. 1,700,001 - Rs. 2,200,000: 12%
- Rs. 2,200,001 - Rs. 2,700,000: 18%
- Rs. 2,700,001 - Rs. 3,200,000: 24%
- Rs. 3,200,001 - Rs. 3,700,000: 30%
- Above Rs. 3,700,000: 36%

### 🏪 **SSCL Tax Calculator**
Social Security Contribution Levy calculation including:
- Sale Tax: 2.5% of goods value
- VAT: 15% of (goods value + sale tax)
- Total SSCL Tax: Sale Tax + VAT

### 🚗 **Leasing Payment Calculator**
Comprehensive leasing calculations with three modes:
- **Monthly Installment**: Calculate monthly payments based on lease amount, interest rate, and term
- **Category Search**: Compare payment options for different terms (3-5 years)
- **Leasing Amount**: Determine maximum lease amount based on affordable monthly payment

## Technology Stack

- **Backend**: Spring Boot 3.2.0
- **Frontend**: Thymeleaf, HTML5, CSS3, JavaScript
- **Build Tool**: Maven
- **Java Version**: 17
- **Dependencies**:
  - Spring Boot Starter Web
  - Spring Boot Starter Thymeleaf
  - Spring Boot Starter Validation
  - Spring Boot DevTools

## Project Structure

```
src/
├── main/
│   ├── java/com/taxcalculator/
│   │   ├── controller/
│   │   │   └── TaxCalculatorController.java
│   │   ├── model/
│   │   │   ├── TaxResult.java
│   │   │   ├── SSCLTaxResult.java
│   │   │   └── LeasingResult.java
│   │   ├── service/
│   │   │   └── TaxCalculationService.java
│   │   └── TaxCalculatorWebApplication.java
│   └── resources/
│       ├── static/
│       │   ├── css/style.css
│       │   └── js/calculator.js
│       ├── templates/
│       │   ├── index.html
│       │   ├── withholding.html
│       │   ├── payable.html
│       │   ├── income.html
│       │   ├── sscl.html
│       │   └── leasing.html
│       └── application.properties
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tax-calculator-web
   ```

2. **Build the project**
   ```bash
   ./mvnw clean install
   ```

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Access the application**
   Open your browser and navigate to: `http://localhost:8080`

### Alternative Running Methods

**Using Maven directly:**
```bash
mvn spring-boot:run
```

**Using Java JAR:**
```bash
./mvnw clean package
java -jar target/tax-calculator-web-0.0.1-SNAPSHOT.jar
```

## API Endpoints

### REST API Documentation

All calculations are available through REST endpoints:

#### Withholding Tax
- `POST /api/calculate/rent-tax` - Calculate rent tax
- `POST /api/calculate/bank-interest-tax` - Calculate bank interest tax
- `POST /api/calculate/dividend-tax` - Calculate dividend tax

#### Other Tax Types
- `POST /api/calculate/payable-tax` - Calculate payable tax
- `POST /api/calculate/income-tax` - Calculate income tax
- `POST /api/calculate/sscl-tax` - Calculate SSCL tax

#### Leasing Calculations
- `POST /api/calculate/monthly-installment` - Calculate monthly installment
- `POST /api/calculate/leasing-category` - Search leasing categories
- `POST /api/calculate/leasing-amount` - Find maximum leasing amount

### Example API Usage

**Calculate Rent Tax:**
```bash
curl -X POST http://localhost:8080/api/calculate/rent-tax \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "amount=150000"
```

**Calculate Monthly Installment:**
```bash
curl -X POST http://localhost:8080/api/calculate/monthly-installment \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "leaseAmount=1000000&interestRate=12&years=3"
```

## Features Overview

### User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with gradient backgrounds and card-based layout
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback
- **Form Validation**: Client-side and server-side validation with clear error messages
- **Currency Formatting**: Automatic formatting of amounts in Sri Lankan Rupees

### Calculation Features
- **Progressive Tax Brackets**: Accurate implementation of Sri Lankan tax brackets
- **Real-time Calculations**: Instant results without page refresh
- **Multiple Calculation Modes**: Different calculation types for various scenarios
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Reset Functionality**: Easy form reset for new calculations

### Technical Features
- **RESTful API**: Clean REST endpoints for integration with other systems
- **Service Layer**: Separated business logic for maintainability
- **Model Classes**: Well-structured data models for different calculation types
- **Exception Handling**: Proper error handling and validation
- **Development Tools**: Hot reload support for development

## Configuration

### Application Properties
The application can be configured through `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/

# Thymeleaf Configuration
spring.thymeleaf.cache=false
spring.thymeleaf.enabled=true
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html

# Static Resources
spring.web.resources.static-locations=classpath:/static/

# Application Configuration
spring.application.name=Tax Calculator Web Application
```

## Development

### Running in Development Mode
The application includes Spring Boot DevTools for hot reload during development:

```bash
./mvnw spring-boot:run
```

Changes to templates, static resources, and Java classes will be automatically reloaded.

### Building for Production
To build the application for production:

```bash
./mvnw clean package -Pproduction
```

## Tax Calculation Logic

### Rent Tax
- No tax on amounts up to Rs. 100,000
- 10% tax on amounts exceeding Rs. 100,000

### Bank Interest Tax
- Flat 5% tax on all bank interest income

### Dividend Tax (Progressive)
- Rs. 100,001 - Rs. 141,667: 6%
- Rs. 141,668 - Rs. 183,333: 12%
- Rs. 183,334 - Rs. 225,000: 18%
- Rs. 225,001 - Rs. 266,667: 24%
- Rs. 266,668 - Rs. 308,333: 30%
- Above Rs. 308,333: 36%

### SSCL Tax
1. Calculate Sale Tax: 2.5% of goods value
2. Calculate VAT: 15% of (goods value + sale tax)
3. Total SSCL Tax = Sale Tax + VAT

### Leasing Calculations
Uses standard loan amortization formulas:
- Monthly Payment = (P × r) / (1 - (1 + r)^(-n))
- Where P = Principal, r = Monthly interest rate, n = Number of months

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## Changelog

### Version 0.0.1-SNAPSHOT
- Initial release
- All basic tax calculation features
- Responsive web interface
- REST API endpoints
- Comprehensive leasing calculator

---

**Built with ❤️ using Spring Boot and modern web technologies**