# Utils Package

Shared utility functions for formatting, validation, and storage.

## Usage

```tsx
import { formatCurrency, isValidEmail, storage } from 'utils';

// Format
const price = formatCurrency(1999.99); // "$1,999.99"

// Validation
const valid = isValidEmail('user@example.com'); // true

// Storage
storage.set('user', { name: 'John' });
const user = storage.get('user');
```
