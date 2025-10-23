// src/utils/imageHelper.js
const getPlaceholderImage = (genre) => {
  const genreMap = {
    'Rock': 'https://images.unsplash.com/photo-1510915362895-4183a37f2143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYmFuZHxlbnwwfHx8fDE3MDQ2NTY3ODd8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'Pop': 'https://images.unsplash.com/photo-1470225640330-e300ee1099c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMG11c2ljfGVufDB8MHx8fDE3MDQ2NTY4MTd8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'Britpop': 'https://images.unsplash.com/photo-1519732544722-d29b00717961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxiaXJpdGlzaCUyMGJhbmR8ZW58MHx8fHwxNzA0NjU2ODQxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'Soul/Motown': 'https://images.unsplash.com/photo-1514525253164-ff4ade295834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzb3VsJTIwYmFuZHxlbnwwfHx8fDE3MDQ2NTY4NjV8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'Soul/Jazz': 'https://images.unsplash.com/photo-1511379938547-c1f694105059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZHxlbnwwfHx8fDE3MDQ2NTY4OTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'Blues/Soul': 'https://images.unsplash.com/photo-1524678606370-a47ad284cb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxibHVlcyUyMGJhbmR8ZW58MHx8fHwxNzA0NjU2OTIxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'Ska/Blues': 'https://images.unsplash.com/photo-1524678606370-a47ad284cb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxza2ElMjBiYW5kfGVufDB8fHx8MTcwNDY1NjkyMXww&ixlib=rb-4.0.3&q=80&w=1080',
    'Ska': 'https://images.unsplash.com/photo-1519732544722-d29b00717961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxza2ElMjBiYW5kfGVufDB8fHx8MTcwNDY1Njg0MXww&ixlib=rb-4.0.3&q=80&w=1080',
    'Rock/Pop': 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxyb2NrJTIwY29uY2VydHxlbnwwfHx8fDE3MDQ2NTY5NDF8MA&ixlib=rb-4.0.3&q=80&w=1080',
    'Pop/Soul': 'https://images.unsplash.com/photo-1514525253164-ff4ade295834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzb3VsJTIwc2luZ2VyfGVufDB8fHx8MTcwNDY1Njk2NXww&ixlib=rb-4.0.3&q=80&w=1080',
    // Default placeholder if genre not matched
    'default': 'https://images.unsplash.com/photo-1514525253164-ff4ade295834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmR8ZW58MHx8fHwxNzA0NjU2OTQxfDA&ixlib=rb-4.0.3&q=80&w=1080'
  };
  return genreMap[genre] || genreMap['default'];
};

export const handleImageError = (e, artist) => {
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = getPlaceholderImage(artist.genre);
  e.target.style.filter = 'grayscale(50%)'; // Optional: visually indicate it's a placeholder
};

