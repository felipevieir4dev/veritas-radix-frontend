// Teste rápido das APIs
console.log('Gemini Key:', process.env.VITE_GEMINI_API_KEY ? 'Configurada' : 'Não encontrada');
console.log('Unsplash Key:', process.env.VITE_UNSPLASH_ACCESS_KEY ? 'Configurada' : 'Não encontrada');

// Teste Gemini
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: 'teste' }] }]
  })
})
.then(r => console.log('Gemini status:', r.status))
.catch(e => console.log('Gemini erro:', e.message));

// Teste Unsplash
fetch(`https://api.unsplash.com/search/photos?query=test&per_page=1`, {
  headers: { 'Authorization': `Client-ID ${process.env.VITE_UNSPLASH_ACCESS_KEY}` }
})
.then(r => console.log('Unsplash status:', r.status))
.catch(e => console.log('Unsplash erro:', e.message));