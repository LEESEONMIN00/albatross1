export default function createActionTypes(type) {
  const SUEESS = `${type}_SUCCESS`;
  const FAILURE = `${type}FAILURE`;

  return [type, SUEESS, FAILURE];
}
