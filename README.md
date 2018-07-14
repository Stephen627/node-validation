# Node Validation
A small simple library to validate JavaScript objects

## Install
```
$ npm i @stephen627/node-validation
```

## Example
```javascript
const validation = require('@stephen627/node-validation');

const validator = new validation.Validator();
validator.setRules({
    foo: 'required',
    bar: 'required|regex:[0-9]+',
}).setData({
    foo: 'bar',
    bar: 123,
});

// Returns true or false based on whether or not the validation passed
validator.passes();
// Gets the errors if any that the validator found
validator.getErrors();
```
An example output of the `getErrors()` function is:

```
[
  'foo is required',
  'bar is required',
  'bar does not meet the required format of [0-9]+'
]
```

You can add your own rules they just need to implement the `Rule` interface, they also need to have a default export of the `Rule` class. Here is an example of a rule in TypeScript.

```typescript
import { Rule } from '@stephen627/node-validation';

class Required implements Rule {

  public validate (data: string): boolean {
    return !!data;
  }

  public getErrorString (key: string): string {
    return `${key} is required`;
  }

}

export default Required;

```

## Current Rules

### Required
True when the rule key exists in the data object. `key: 'required'`

### RegEx
True when the data matches the rule provided. `key: 'regex:[0-9]+'`

### In
True when the data exists in the comma separated list provided. `key: 'in:foo,bar'`
