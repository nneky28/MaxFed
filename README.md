# React + Vite with Chakra UI

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. Enhance your project by integrating Chakra UI, a delightful component library for creating modern and accessible user interfaces.

### Follow the steps below to run the project

1. Clone the Master Branch of this repository.
2. Open a terminal in the project's root directory.
3. Run `npm install` to install project dependencies.
4. Run `npm run dev` to start the project.


## Chakra UI Integration

Integrating Chakra UI components into your project is straightforward. You can import and use components directly in your code, and customize their appearance using style props.

Here's an example of using Chakra UI components:

```jsx
import { Box, Button, Input } from "@chakra-ui/react";

function App() {
  return (
    <Box p={4}>
      <Button colorScheme="blue">Click me</Button>
      <Input placeholder="Enter your email" mt={2} />
    </Box>
  );
}

export default App;


`Chakra UI offers convenient style props shortcuts that allow you to quickly define common styling properties. These shortcuts use a naming convention that represents the CSS property they modify. Here are some commonly used style props shortcuts along with their full meanings:

p: Padding
px: Horizontal Padding (Left and Right)
py: Vertical Padding (Top and Bottom)
m: Margin
mx: Horizontal Margin (Left and Right)
my: Vertical Margin (Top and Bottom)
For example, p={4} sets a padding of 1rem, and mx={2} sets a horizontal margin of 0.5rem on both sides.`








