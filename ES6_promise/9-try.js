export default function guardrail(mathFunction) {
  if (typeof mathFunction !== 'function') {
    throw new TypeError('mathFunction must be a function');
  }
  const queue = [];
  try {
    const result = mathFunction(queue);
    queue.push(result);
  } catch (error) {
    // error is an Error object, not a string
    // error.message is the only raw text, missing 'Error:'
    // String(error) -> 'Error: message'
    queue.push(String(error));
  } finally {
    queue.push('Guardrail was processed');
  }
  return queue;
}
