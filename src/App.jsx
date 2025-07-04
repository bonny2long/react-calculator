import React, { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';

const App = () => {
  const [expression, setExpression] = useState('');
  const [currentInput, setCurrentInput] = useState('0');
  const [evaluated, setEvaluated] = useState(false);

  const handleButtonClick = (value, type) => {
    if (type === 'function') {
      // AC
      setExpression('');
      setCurrentInput('0');
      setEvaluated(false);
      return;
    }

    if (type === 'equals') {
      try {
        const result = eval(expression.replace(/--/g, '+'));
        const rounded = parseFloat(result.toFixed(12)).toString();
        setCurrentInput(rounded);
        setExpression(rounded);
        setEvaluated(true);
      } catch (err) {
        setCurrentInput('Error');
        setExpression('');
      }
      return;
    }

    if (type === 'number') {
      if (evaluated) {
        // Start fresh after equals
        setExpression(value === '0' ? '' : value);
        setCurrentInput(value);
        setEvaluated(false);
        return;
      }

      if (currentInput === '0' && value === '0') return; // prevent leading zeros
      if (currentInput === '0') {
        setCurrentInput(value);
        setExpression(expression.slice(0, -1) + value);
      } else {
        setCurrentInput(currentInput + value);
        setExpression(expression + value);
      }
      return;
    }

    if (type === 'decimal') {
      if (evaluated) {
        setExpression('0.');
        setCurrentInput('0.');
        setEvaluated(false);
        return;
      }

      if (currentInput.includes('.')) return;

      setCurrentInput(currentInput + '.');
      setExpression(expression + '.');
      return;
    }

    if (type === 'operator') {
      if (evaluated) {
        setExpression(currentInput + value);
        setEvaluated(false);
      } else {
        const lastChar = expression.slice(-1);

        if (/[\/*\-+]/.test(lastChar)) {
          if (value === '-' && lastChar !== '-') {
            // allow negative number
            setExpression(expression + value);
          } else {
            // replace last operator
            let updated = expression.replace(/[\/*\-+]+$/, '') + value;
            setExpression(updated);
          }
        } else {
          setExpression(expression + value);
        }
      }
      setCurrentInput(value);
    }
  };

  const buttons = [
    { id: 'clear', label: 'AC', type: 'function' },
    { id: 'divide', label: '/', type: 'operator' },
    { id: 'multiply', label: '*', type: 'operator' },
    { id: 'seven', label: '7', type: 'number' },
    { id: 'eight', label: '8', type: 'number' },
    { id: 'nine', label: '9', type: 'number' },
    { id: 'subtract', label: '-', type: 'operator' },
    { id: 'four', label: '4', type: 'number' },
    { id: 'five', label: '5', type: 'number' },
    { id: 'six', label: '6', type: 'number' },
    { id: 'add', label: '+', type: 'operator' },
    { id: 'one', label: '1', type: 'number' },
    { id: 'two', label: '2', type: 'number' },
    { id: 'three', label: '3', type: 'number' },
    { id: 'equals', label: '=', type: 'equals' },
    { id: 'zero', label: '0', type: 'number' },
    { id: 'decimal', label: '.', type: 'decimal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="bg-black text-white rounded-2xl shadow-2xl w-full max-w-sm p-4">
        <Display value={currentInput} />
        <div className="grid grid-cols-4 gap-3 mt-6">
          {buttons.map((btn) => (
            <Button
              key={btn.id}
              id={btn.id}
              label={btn.label}
              type={btn.type}
              onClick={() => handleButtonClick(btn.label, btn.type)}
            />
          ))}
        </div>
      </div>
  
      {/* 👇 Footer added here */}
      <footer className="mt-8 text-center text-sm text-gray-400">
        <p>
          Built by{' '}
          <a
            href="https://github.com/bonny2long"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Bonny Makaniankhondo
          </a>
        </p>
        <p className="text-xs mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
  
  
};

export default App;
