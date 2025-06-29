// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2
    }).format(amount).replace('LKR', 'Rs.');
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.innerHTML = `<div class="error-card">${message}</div>`;
    }
}

function hideError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.innerHTML = '';
    }
}

function showResult(resultHtml) {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = resultHtml;
    }
}

function hideResult() {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = '';
    }
}

// Withholding Tax Calculator
function calculateWithholdingTax() {
    const taxType = document.querySelector('input[name="taxType"]:checked');
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (!taxType) {
        showError('Please select a tax type');
        return;
    }
    
    if (!amount || amount <= 0) {
        showError('Please enter a valid amount greater than 0');
        return;
    }
    
    hideError();
    
    const endpoint = `/api/calculate/${taxType.value}-tax`;
    
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `amount=${amount}`
    })
    .then(response => response.json())
    .then(data => {
        let resultHtml = '<div class="result-card"><h4>Tax Calculation Result</h4>';
        
        if (data.message) {
            resultHtml += `<p>${data.message}</p>`;
        } else {
            resultHtml += `
                <div class="result-item">
                    <span>Amount:</span>
                    <span>${formatCurrency(data.grossAmount)}</span>
                </div>
                <div class="result-item">
                    <span>Tax Amount:</span>
                    <span>${formatCurrency(data.amount)}</span>
                </div>
                <div class="result-item">
                    <span>Net Amount:</span>
                    <span>${formatCurrency(data.netAmount)}</span>
                </div>
            `;
        }
        
        resultHtml += '</div>';
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while calculating tax');
        console.error('Error:', error);
    });
}

// Payable Tax Calculator
function calculatePayableTax() {
    const salary = parseFloat(document.getElementById('salary').value);
    
    if (!salary || salary <= 0) {
        showError('Please enter a valid salary amount greater than 0');
        return;
    }
    
    hideError();
    
    fetch('/api/calculate/payable-tax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `salary=${salary}`
    })
    .then(response => response.json())
    .then(data => {
        let resultHtml = '<div class="result-card"><h4>Payable Tax Calculation Result</h4>';
        
        if (data.message) {
            resultHtml += `<p>${data.message}</p>`;
        } else {
            resultHtml += `
                <div class="result-item">
                    <span>Monthly Salary:</span>
                    <span>${formatCurrency(data.grossAmount)}</span>
                </div>
                <div class="result-item">
                    <span>Payable Tax:</span>
                    <span>${formatCurrency(data.amount)}</span>
                </div>
                <div class="result-item">
                    <span>Net Salary:</span>
                    <span>${formatCurrency(data.netAmount)}</span>
                </div>
            `;
        }
        
        resultHtml += '</div>';
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while calculating tax');
        console.error('Error:', error);
    });
}

// Income Tax Calculator
function calculateIncomeTax() {
    const income = parseFloat(document.getElementById('income').value);
    
    if (!income || income <= 0) {
        showError('Please enter a valid income amount greater than 0');
        return;
    }
    
    hideError();
    
    fetch('/api/calculate/income-tax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `income=${income}`
    })
    .then(response => response.json())
    .then(data => {
        let resultHtml = '<div class="result-card"><h4>Income Tax Calculation Result</h4>';
        
        if (data.message) {
            resultHtml += `<p>${data.message}</p>`;
        } else {
            resultHtml += `
                <div class="result-item">
                    <span>Annual Income:</span>
                    <span>${formatCurrency(data.grossAmount)}</span>
                </div>
                <div class="result-item">
                    <span>Income Tax:</span>
                    <span>${formatCurrency(data.amount)}</span>
                </div>
                <div class="result-item">
                    <span>Net Income:</span>
                    <span>${formatCurrency(data.netAmount)}</span>
                </div>
            `;
        }
        
        resultHtml += '</div>';
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while calculating tax');
        console.error('Error:', error);
    });
}

// SSCL Tax Calculator
function calculateSSCLTax() {
    const valueOfGoods = parseFloat(document.getElementById('valueOfGoods').value);
    
    if (!valueOfGoods || valueOfGoods <= 0) {
        showError('Please enter a valid value greater than 0');
        return;
    }
    
    hideError();
    
    fetch('/api/calculate/sscl-tax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `valueOfGoods=${valueOfGoods}`
    })
    .then(response => response.json())
    .then(data => {
        const resultHtml = `
            <div class="result-card">
                <h4>SSCL Tax Calculation Result</h4>
                <div class="result-item">
                    <span>Value of Goods:</span>
                    <span>${formatCurrency(data.valueOfGoods)}</span>
                </div>
                <div class="result-item">
                    <span>Sale Tax (2.5%):</span>
                    <span>${formatCurrency(data.saleTax)}</span>
                </div>
                <div class="result-item">
                    <span>VAT (15%):</span>
                    <span>${formatCurrency(data.vat)}</span>
                </div>
                <div class="result-item">
                    <span>Total SSCL Tax:</span>
                    <span>${formatCurrency(data.totalSSCLTax)}</span>
                </div>
            </div>
        `;
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while calculating SSCL tax');
        console.error('Error:', error);
    });
}

// Leasing Calculator
function calculateLeasing() {
    const calculationType = document.querySelector('input[name="calculationType"]:checked');
    
    if (!calculationType) {
        showError('Please select a calculation type');
        return;
    }
    
    hideError();
    
    switch (calculationType.value) {
        case 'monthly':
            calculateMonthlyInstallment();
            break;
        case 'category':
            searchLeasingCategory();
            break;
        case 'amount':
            findLeasingAmount();
            break;
    }
}

function calculateMonthlyInstallment() {
    const leaseAmount = parseFloat(document.getElementById('leaseAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('years').value);
    
    if (!leaseAmount || !interestRate || !years) {
        showError('Please fill in all required fields');
        return;
    }
    
    fetch('/api/calculate/monthly-installment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `leaseAmount=${leaseAmount}&interestRate=${interestRate}&years=${years}`
    })
    .then(response => response.json())
    .then(data => {
        const resultHtml = `
            <div class="result-card">
                <h4>Monthly Installment Calculation</h4>
                <div class="result-item">
                    <span>Monthly Installment:</span>
                    <span>${formatCurrency(data.monthlyInstallment)}</span>
                </div>
            </div>
        `;
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while calculating monthly installment');
        console.error('Error:', error);
    });
}

function searchLeasingCategory() {
    const leaseAmount = parseFloat(document.getElementById('leaseAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    
    if (!leaseAmount || !interestRate) {
        showError('Please fill in lease amount and interest rate');
        return;
    }
    
    fetch('/api/calculate/leasing-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `leaseAmount=${leaseAmount}&interestRate=${interestRate}`
    })
    .then(response => response.json())
    .then(data => {
        let resultHtml = '<div class="result-card"><h4>Leasing Category Options</h4>';
        
        data.categories.forEach(category => {
            resultHtml += `
                <div class="result-item">
                    <span>${category.years} Years:</span>
                    <span>${formatCurrency(category.monthlyPayment)}/month</span>
                </div>
            `;
        });
        
        resultHtml += '</div>';
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while searching leasing categories');
        console.error('Error:', error);
    });
}

function findLeasingAmount() {
    const monthlyPayment = parseFloat(document.getElementById('monthlyPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('years').value);
    
    if (!monthlyPayment || !interestRate || !years) {
        showError('Please fill in all required fields');
        return;
    }
    
    fetch('/api/calculate/leasing-amount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `monthlyPayment=${monthlyPayment}&interestRate=${interestRate}&years=${years}`
    })
    .then(response => response.json())
    .then(data => {
        const resultHtml = `
            <div class="result-card">
                <h4>Maximum Leasing Amount</h4>
                <div class="result-item">
                    <span>Leasing Amount:</span>
                    <span>${formatCurrency(data.leasingAmount)}</span>
                </div>
            </div>
        `;
        showResult(resultHtml);
    })
    .catch(error => {
        showError('An error occurred while calculating leasing amount');
        console.error('Error:', error);
    });
}

function resetForm() {
    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    hideError();
    hideResult();
}

// Event listeners for radio button styling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove selected class from all options in the same group
            document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
                r.closest('.radio-option').classList.remove('selected');
            });
            // Add selected class to current option
            this.closest('.radio-option').classList.add('selected');
        });
    });
});