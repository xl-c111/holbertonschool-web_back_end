export default function guardrail(mathFunction) {
  if (typeof mathFunction !== 'function') {
    throw new TypeError('mathFunction must be a function');
  }
  const queue = [];
  try {
    const result = mathFunction(queue);
    queue.push(result);
  } catch (error) {
    queue.push(String(error));
  } finally {
    queue.push('Guardrail was processed');
  }
  return queue;
}
