const display = document.getElementById('display');
let currentInput = '';
let lastInputType = '';

const buttons = document.querySelectorAll('#container button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        const value = button.textContent;

        if (id === 'clear') {
            currentInput = '';
            display.textContent = 0;
            lastInputType = '';
            return;
        }

        if (id === 'equals') {
            try {
                const sanitizedInput = currentInput.replace(/X/g, '*');
                const result = eval(sanitizedInput);
                display.textContent = result;
                currentInput = result.toString();
                lastInputType = 'number';
            } catch {
                display.textContent = 'Error';
                currentInput = '';
                lastInputType = '';
            }
            return;
        }

        const lastChar = currentInput.slice(-1);


        if (id === 'decimal') {
            const parts = currentInput.split(/[\+\-\*\/]/);
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) return;
            if (lastPart === '') currentInput += '0';
            currentInput += '.';
            display.textContent = currentInput;
            lastInputType = 'decimal';
            return;
        }


        if (!isNaN(value)) {
            const parts = currentInput.split(/[\+\-\*\/]/);
            const lastPart = parts[parts.length - 1];


            if (lastPart === '0') return;

            currentInput += value;
            display.textContent = currentInput;
            lastInputType = 'number';
            return;
        }


        if (['+', '-', '/', 'X'].includes(value)) {
            if (currentInput === '' && value !== '-') return;

            const lastChar = currentInput.slice(-1);
            const secondLastChar = currentInput.slice(-2, -1);

            const endsWithTwoOps = ['+', '-', '*', '/', 'X'].includes(lastChar) &&
                ['+', '-', '*', '/', 'X'].includes(secondLastChar);

            if (endsWithTwoOps) {

                currentInput = currentInput.slice(0, -2) + value;
            } else if (['+', '*', '/', 'X'].includes(lastChar)) {
                if (value === '-') {

                    currentInput += value;
                } else {

                    currentInput = currentInput.slice(0, -1) + value;
                }
            } else {
                currentInput += value;
            }

            display.textContent = currentInput;
            lastInputType = 'operator';
            return;
        }
    });
});