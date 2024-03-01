import { createApp } from './app';

const app = createApp(); 
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});