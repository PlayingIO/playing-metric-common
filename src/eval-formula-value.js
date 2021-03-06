const nerdamer = require('nerdamer');

/**
 * Evaluate metric value formula with variables
 */
module.exports = function evalFormulaValue (metricType, value, variables) {
  const result = nerdamer(value, variables).evaluate();
  switch (metricType) {
    case 'point':
    case 'set':
    case 'compound':
      return parseInt(result.text());
    default:
      return result.text();
  }
};