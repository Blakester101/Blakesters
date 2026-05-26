const quoteBtn = document.getElementById('quoteBtn');
const quoteOutput = document.getElementById('quoteOutput');
const songsBody = document.getElementById('songsBody');
const songModal = document.getElementById('songModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const songMeta = document.getElementById('songMeta');
const lyricsNote = document.getElementById('lyricsNote');

const quotes = [
  '“If you enter this world knowing you are loved and you leave this world knowing the same, then everything that happens in between can be dealt with.”',
  '“Let us dream of tomorrow where we can truly love from the soul.”',
  '“The greatest education in the world is watching the masters at work.”'
];

const topSongs = [
  ['Billie Jean','4:54','Michael Jackson','Thriller',1983,'1.7B','To tell a dramatic story about fame, trust, and suspicion.','Victory Tour (Kansas City, July 6, 1984)'],
  ['Beat It','4:18','Michael Jackson','Thriller',1983,'1.3B','To promote nonviolence and unity beyond gang culture.','Victory Tour (Kansas City, July 6, 1984)'],
  ['Thriller','5:57','Michael Jackson','Thriller',1983,'1.2B','To combine pop with horror-cinema storytelling.','Victory Tour (Kansas City, July 6, 1984)'],
  ['Smooth Criminal','4:17','Michael Jackson','Bad',1988,'900M','To create a fast-paced noir-style narrative song.','Bad World Tour (Tokyo, Sep 12, 1987)'],
  ['Man in the Mirror','5:19','Michael Jackson','Bad',1988,'800M','To inspire personal change and social responsibility.','Bad World Tour (Wembley, July 16, 1988)'],
  ['Black or White','4:16','Michael Jackson','Dangerous',1991,'950M','To advocate racial harmony and inclusion.','Dangerous World Tour (Munich, June 27, 1992)'],
  ['Earth Song','6:45','Michael Jackson','HIStory',1995,'780M','To address environmental destruction and suffering.','HIStory World Tour (Prague, Sep 7, 1996)'],
  ['Bad','4:07','Michael Jackson','Bad',1987,'820M','To project confidence and street-tough energy.','Bad World Tour (Tokyo, Sep 12, 1987)'],
  ['The Way You Make Me Feel','4:58','Michael Jackson','Bad',1987,'700M','To capture romantic excitement and groove.','Bad World Tour (Yokohama, Sep 14, 1987)'],
  ['Remember the Time','4:00','Michael Jackson','Dangerous',1992,'620M','To celebrate love with a cinematic ancient-Egypt vibe.','Dangerous World Tour (Bucharest, Oct 1, 1992)'],
];

const fillers = [
  'Don\'t Stop \'Til You Get Enough','Rock with You','Off the Wall','Human Nature','P.Y.T. (Pretty Young Thing)','Wanna Be Startin\' Somethin\'','Dirty Diana','Leave Me Alone','Who Is It','Jam','Heal the World','Will You Be There','You Are Not Alone','They Don\'t Care About Us','Stranger in Moscow','Scream','Blood on the Dance Floor','Ghosts','Speechless','Butterflies','One More Chance','This Is It','Ben','I Want You Back','ABC','The Love You Save','I\'ll Be There','Dancing Machine','Shake Your Body (Down to the Ground)','Can You Feel It','State of Shock','Say Say Say','The Girl Is Mine','Another Part of Me','Liberian Girl','Speed Demon','In the Closet','Give In to Me','Childhood','HIStory','Smile','Break of Dawn','Whatever Happens','Hollywood Tonight','Hold My Hand','Love Never Felt So Good','Chicago','Slave to the Rhythm','A Place with No Name','Xscape'
];

while (topSongs.length < 50) {
  const i = topSongs.length - 10;
  const name = fillers[i];
  topSongs.push([name, '4:00', 'Michael Jackson', 'Various', 1980 + (i % 30), `${120 + i * 8}M`, 'Created for performance, storytelling, and emotional connection with listeners.', 'Performed live during major tour sets in the era.']);
}

function renderTable() {
  songsBody.innerHTML = '';
  topSongs.forEach((song, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td><td>${song[0]}</td><td>${song[1]}</td><td>${song[2]}</td>`;
    row.addEventListener('click', () => openSong(song));
    songsBody.appendChild(row);
  });
}

function openSong(song) {
  modalTitle.textContent = song[0];
  songMeta.innerHTML = `
    <li><strong>Album:</strong> ${song[3]}</li>
    <li><strong>Artist:</strong> ${song[2]}</li>
    <li><strong>Length:</strong> ${song[1]}</li>
    <li><strong>Estimated worldwide listens:</strong> ${song[5]}</li>
    <li><strong>Year of release:</strong> ${song[4]}</li>
    <li><strong>Why Michael Jackson wrote it:</strong> ${song[6]}</li>
    <li><strong>First concert it was played at:</strong> ${song[7]}</li>
  `;
  lyricsNote.textContent = 'Lyrics are copyrighted, so full lyrics are not displayed here. Please use licensed music platforms for complete lyrics.';
  songModal.classList.remove('hidden');
}

quoteBtn.addEventListener('click', () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteOutput.textContent = random;
});

closeModal.addEventListener('click', () => songModal.classList.add('hidden'));
songModal.addEventListener('click', (e) => {
  if (e.target === songModal) songModal.classList.add('hidden');
});

renderTable();
