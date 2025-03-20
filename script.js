// script.js

// Function to process and convert the grammar
function processGrammar() {
    // Get input value (grammar in the form of S → aAb | ab | b)
    let inputGrammar = document.getElementById('grammarInput').value;
    
    // Parse the input grammar
    let productions = parseGrammar(inputGrammar);
    
    // Convert to CNF (Chomsky Normal Form)
    let cnfGrammar = toCNF(productions);
    document.getElementById('cnfOutput').textContent = formatGrammar(cnfGrammar);

    // Convert to GNF (Greibach Normal Form)
    let gnfGrammar = toGNF(productions);
    document.getElementById('gnfOutput').textContent = formatGrammar(gnfGrammar);
}

// Parse the grammar input into a usable format
function parseGrammar(input) {
    let lines = input.trim().split('\n');
    let productions = {};

    lines.forEach(line => {
        let parts = line.split('→').map(s => s.trim());
        let left = parts[0];
        let right = parts[1].split('|').map(s => s.trim());

        productions[left] = right;
    });

    return productions;
}

// Format the grammar in a readable way
function formatGrammar(productions) {
    let formatted = '';
    for (let nonTerminal in productions) {
        formatted += nonTerminal + ' → ' + productions[nonTerminal].join(' | ') + '\n';
    }
    return formatted;
}

// Convert to Chomsky Normal Form (CNF)
function toCNF(productions) {
    // Implement basic CNF conversion logic (this is a simplified version)
    let newProductions = JSON.parse(JSON.stringify(productions));

    // Rule: Break down productions with more than two symbols on the right-hand side
    for (let nonTerminal in newProductions) {
        newProductions[nonTerminal] = newProductions[nonTerminal].map(rule => {
            if (rule.length > 2) {
                let newNonTerminal = rule[0] + rule[1];
                newProductions[newNonTerminal] = [rule.slice(2)];
                return rule[0] + newNonTerminal;
            }
            return rule;
        });
    }

    return newProductions;
}

// Convert to Greibach Normal Form (GNF)
function toGNF(productions) {
    // Implement basic GNF conversion logic (this is a simplified version)
    let newProductions = JSON.parse(JSON.stringify(productions));

    // Rule: Ensure each production starts with a terminal symbol
    for (let nonTerminal in newProductions) {
        newProductions[nonTerminal] = newProductions[nonTerminal].map(rule => {
            if (rule[0].toUpperCase() === rule[0]) {
                let firstNonTerminal = rule[0];
                let expandedRules = newProductions[firstNonTerminal].map(subRule => subRule + rule.slice(1));
                return expandedRules;
            }
            return rule;
        });
    }

    return newProductions;
}
