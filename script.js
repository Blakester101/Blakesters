const timeline = [
  ['1958', 'Born in Gary, Indiana', 'Michael Joseph Jackson was born on August 29, 1958, the eighth of ten children to Katherine and Joseph Jackson. Growing up in a small house in Gary, Indiana, music was the cornerstone of the family.'],
  ['1964', 'The Jackson 5 Forms', 'At just 6 years old, Michael joined his brothers Tito, Jackie, Jermaine, and Marlon to form The Jackson 5. His extraordinary talent immediately shone — his voice and stage presence were unlike anything seen at his age.'],
  ['1969', 'Motown & First #1 Hits', 'Signed by Berry Gordy to Motown Records, The Jackson 5 released "I Want You Back," which rocketed to #1. Their first four singles all hit the top spot — an unprecedented achievement for any debut act.'],
  ['1971', 'Solo Career Begins', 'While still a member of The Jackson 5, Michael launched his solo career with "Got to Be There," hinting at the transcendent superstar he was destined to become.'],
  ['1979', 'Off the Wall', 'Produced with Quincy Jones, Off the Wall marked Michael\'s arrival as an adult solo superstar. It generated four Top 10 hits and became the first solo album to produce four Top 10 singles in the US.'],
  ['1982', 'Thriller Changes Everything', 'The release of Thriller on November 30, 1982 was a seismic cultural moment. It became — and remains — the best-selling album of all time, with an estimated 70–100 million copies sold worldwide.'],
  ['1983', 'The Moonwalk Debut', 'On March 25, 1983, during the Motown 25: Yesterday, Today and Forever TV special, Michael debuted the moonwalk. In one televised moment, he redefined what dance and performance meant to a generation.'],
  ['1987', 'Bad Era & World Tour', 'The Bad album spawned five consecutive #1 singles — another world record. The accompanying Bad World Tour sold out arenas globally and became one of the highest-grossing tours of the decade.'],
  ['1991 – 2001', 'Dangerous, HIStory & Invincible', 'Michael continued breaking barriers with Dangerous (1991), the massive double-album HIStory (1995), and Invincible (2001), cementing his place as pop music\'s undisputed architect.'],
  ['2009', 'This Is It — Final Chapter', 'Michael announced a 50-show comeback residency in London titled This Is It, selling out in hours. On June 25, 2009, he passed away at age 50, leaving behind a legacy that will echo for centuries.']
];

const albums = [
  ['🎵', '1972', 'Got to Be There', 'Michael\'s debut solo album introduced the world to his soulful voice beyond The Jackson 5, with timeless cuts that still resonate today.', 'Solo Debut'],
  ['🌙', '1979', 'Off the Wall', 'A disco-funk masterpiece with Quincy Jones that launched Michael as an unrivaled adult solo artist. Four Top 10 singles, a first for any solo act.', '4 Top 10 Singles'],
  ['🕺', '1982', 'Thriller', 'The best-selling album in history. Seven of the nine tracks became singles, winning a record-breaking 8 Grammy Awards at one ceremony. A cultural milestone.', '~100M Copies Sold'],
  ['⚡', '1987', 'Bad', 'The follow-up that proved Thriller was no fluke. Five consecutive #1 singles — a feat never matched before or since. Defined late-80s pop music.', '5 Consecutive #1s'],
  ['🔥', '1991', 'Dangerous', 'Blending New Jack Swing, hard rock, and gospel, Dangerous showcased Michael\'s fearless artistic evolution. It sold over 32 million copies worldwide.', '32M Copies Sold'],
  ['👑', '1995', 'HIStory', 'A double album — half greatest hits, half new material — that became the best-selling multi-disc album ever. A bold artistic and political statement.', 'Best-Selling Double Album'],
  ['✨', '2001', 'Invincible', 'His final studio album debuted at #1 in 13 countries and showed Michael\'s mastery of R&B and pop production, even as industry dynamics had changed.', '#1 in 13 Countries']
];

const achievements = [
  ['🏆', '13 Grammy Awards', 'Including the Grammy Legend Award and the Grammy Lifetime Achievement Award. At the 1984 ceremony, he won a record-breaking 8 Grammys in a single night for Thriller.'],
  ['📖', '39 Guinness World Records', 'From most successful entertainer of all time to the best-selling album, Michael holds more Guinness records than any other musician in history.'],
  ['⭐', 'Rock & Roll Hall of Fame (×2)', 'Inducted twice — first as a member of The Jackson 5 in 1997, then as a solo artist in 2001, one of only a handful of artists to earn this double honour.'],
  ['🎬', 'MTV Video Vanguard Award', 'The first artist to receive the prestigious MTV Video Vanguard Award in 1988. The award was later renamed the "Michael Jackson Video Vanguard Award" in his honour.'],
  ['🌍', '750M+ Records Sold', 'Michael is the best-selling music artist of all time with over 750 million records sold worldwide across solo work and his time with The Jackson 5.'],
  ['🎖️', 'Presidential Honours', 'Received the Presidential Public Safety Communication Award and was recognised by multiple US presidents for his philanthropic contributions to society.'],
  ['🎭', 'Dance Hall of Fame', 'Inducted for revolutionising choreography in popular music. His moves — the moonwalk, the anti-gravity lean, the robot — became part of global cultural vocabulary.'],
  ['📺', 'Thriller Music Video', 'The 14-minute Thriller video was the first music video inducted into the National Film Registry by the Library of Congress as "culturally, historically, or aesthetically significant."'],
  ['🏅', 'American Music Awards Record', 'Won 26 American Music Awards — the most of any artist — including the Award of Merit, the Artist of the Century, and the Artist of the Millennium honour.']
];

const innovations = [
  ['Revolutionised the Music Video', 'Before Michael, music videos were promotional clips. He transformed them into cinematic short films. Thriller, Beat It, and Billie Jean set production standards that reshaped the entire entertainment industry and made MTV what it became.'],
  ['The Moonwalk & Dance Innovation', 'Michael brought together street dance, mime, and classical technique into a seamless performance art. Moves like the moonwalk, the anti-gravity lean, and the robot are still emulated worldwide today.'],
  ['Breaking the Colour Barrier on MTV', 'In the early 1980s, MTV rarely aired Black artists. Michael\'s breakthrough success opened doors for countless Black artists on mainstream platforms.'],
  ['The Stadium Concert Experience', 'Michael redefined what a live concert could be. His Bad and Dangerous World Tours introduced elaborate staging, pyrotechnics, aerial rigging, and full theatrical narrative.'],
  ['Genre-Defying Music Production', 'Working with Quincy Jones and later Teddy Riley and Rodney Jerkins, Michael layered orchestral arrangements with electronic beats, sampling, and live instrumentation.'],
  ['Global Superstardom Model', 'Michael was among the first artists to fully globalise pop music — building a fanbase that transcended borders, language, and culture.']
];

const philanthropy = [
  ['🌍', 'Heal the World Foundation', 'Founded in 1992, this organisation delivered humanitarian aid to children in need, including medical supplies, food, and educational resources across many countries.'],
  ['🎵', 'We Are the World (1985)', 'Co-written with Lionel Richie and produced by Quincy Jones, Michael helped organise the USA for Africa charity single for African famine relief.'],
  ['🏥', 'Children\'s Hospital Donations', 'Michael donated to children\'s hospitals around the world and regularly visited sick children in hospitals wherever he toured.'],
  ['📚', 'Education & Youth Empowerment', 'Funded scholarships, youth arts programs, and libraries worldwide. He believed strongly that education could lift children out of poverty.'],
  ['🤝', '39 Charities Supported', 'The Guinness Book of World Records recognised Michael for supporting more charities than any other entertainer — 39 organisations spanning healthcare, hunger relief, child welfare, and the environment.'],
  ['✌️', 'Peace & Anti-Drug Advocacy', 'Through songs like "Heal the World," "Earth Song," and "Man in the Mirror," Michael used his platform to advocate for environmental protection, world peace, and social justice.']
];

const tags = ['King of Pop', 'Moonwalk', 'Thriller', '39 Guinness Records', '13 Grammys', 'Best-Selling Artist', 'MTV Pioneer', 'Humanitarian', 'Dance Icon', 'Music Video Visionary', 'Rock & Roll Hall of Fame', 'Cultural Icon', 'Heal the World', 'We Are the World'];

const albumColors = {
  'Thriller': ['#111827', '#ef4444'],
  'Bad': ['#111111', '#f8fafc'],
  'Dangerous': ['#7c2d12', '#f59e0b'],
  'Off the Wall': ['#1e1b4b', '#38bdf8'],
  'HIStory': ['#374151', '#d1d5db'],
  'Invincible': ['#111827', '#3b82f6'],
  'The Jackson 5': ['#7c2d12', '#facc15']
};

const songs = [
  ['Thriller', 'Billie Jean', '1982', 'Michael Jackson', 'Thriller', '4:54'],
  ['Thriller', 'Thriller', '1982', 'Michael Jackson', 'Thriller', '5:57'],
  ['Thriller', 'Beat It', '1982', 'Michael Jackson', 'Thriller', '4:18'],
  ['Bad', 'Smooth Criminal', '1987', 'Michael Jackson', 'Bad', '4:17'],
  ['Bad', 'Man in the Mirror', '1987', 'Michael Jackson', 'Bad', '5:19'],
  ['Dangerous', 'Black or White', '1991', 'Michael Jackson', 'Dangerous', '4:16'],
  ['Off the Wall', 'Don\'t Stop \'Til You Get Enough', '1979', 'Michael Jackson', 'Off the Wall', '6:05'],
  ['Off the Wall', 'Rock with You', '1979', 'Michael Jackson', 'Off the Wall', '3:40'],
  ['Bad', 'The Way You Make Me Feel', '1987', 'Michael Jackson', 'Bad', '4:59'],
  ['Thriller', 'P.Y.T. (Pretty Young Thing)', '1982', 'Michael Jackson', 'Thriller', '3:59'],
  ['Thriller', 'Human Nature', '1982', 'Michael Jackson', 'Thriller', '4:06'],
  ['Dangerous', 'Remember the Time', '1991', 'Michael Jackson', 'Dangerous', '3:59'],
  ['Dangerous', 'Heal the World', '1991', 'Michael Jackson', 'Dangerous', '6:24'],
  ['HIStory', 'Earth Song', '1995', 'Michael Jackson', 'HIStory', '6:47'],
  ['The Jackson 5', 'I\'ll Be There', '1970', 'The Jackson 5', 'The Jackson 5', '3:57'],
  ['The Jackson 5', 'ABC', '1970', 'The Jackson 5', 'The Jackson 5', '2:59'],
  ['Thriller', 'Wanna Be Startin\' Somethin\'', '1982', 'Michael Jackson', 'Thriller', '6:03'],
  ['Off the Wall', 'Off the Wall', '1979', 'Michael Jackson', 'Off the Wall', '4:05'],
  ['Bad', 'Bad', '1987', 'Michael Jackson', 'Bad', '4:07'],
  ['Bad', 'Dirty Diana', '1987', 'Michael Jackson', 'Bad', '4:52']
].map(([art, title, year, artist, album, duration], index) => ({
  id: index + 1,
  art,
  title,
  songName: title,
  year,
  artist,
  album,
  duration,
  lyricsNote: 'Lyrics for this song are copyrighted, so this tribute pop-up does not reproduce them. Use an official lyrics source or album booklet to read the full words.',
  lyricMood: `${title} is presented here with a lyric-friendly summary instead: a signature Michael Jackson performance built around rhythm, emotion, and cinematic storytelling.`
}));

let filteredSongs = [...songs];
let activeIndex = 0;
let isPlaying = false;
let progressTimer;
let elapsed = 0;

function byId(id) {
  return document.getElementById(id);
}

function setAlbumGradient(element, album) {
  const [a, b] = albumColors[album] || ['#111827', '#ffd166'];
  element.style.setProperty('--album-a', a);
  element.style.setProperty('--album-b', b);
}

function renderTimeline() {
  byId('timeline').innerHTML = timeline.map(([year, title, text]) => `
    <article class="timeline-item">
      <div class="timeline-year">${year}</div>
      <div class="timeline-card"><h3>${title}</h3><p>${text}</p></div>
    </article>
  `).join('');
}

function renderAlbums() {
  byId('albumGrid').innerHTML = albums.map(([icon, year, title, text, note]) => `
    <article class="album-card" data-icon="${icon}">
      <p class="album-year">${year}</p>
      <h3>${title}</h3>
      <p>${text}</p>
      <span class="album-note">${note}</span>
    </article>
  `).join('');
}

function renderCards(targetId, items) {
  byId(targetId).innerHTML = items.map(([icon, title, text]) => `
    <article class="info-card">
      <div class="info-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join('');
}

function renderInnovations() {
  byId('innovationList').innerHTML = innovations.map(([title, text], index) => `
    <article class="innovation-card">
      <div class="number">${String(index + 1).padStart(2, '0')}</div>
      <div><h3>${title}</h3><p>${text}</p></div>
    </article>
  `).join('');
}

function renderTags() {
  byId('tagCloud').innerHTML = tags.map((tag) => `<span>${tag}</span>`).join('');
}

function renderSongs(list = filteredSongs) {
  byId('songCount').textContent = `Showing ${list.length} of 20 song${list.length === 1 ? '' : 's'}`;
  byId('songTable').innerHTML = list.map((song) => `
    <tr data-id="${song.id}">
      <td>${song.id}</td>
      <td><div class="song-title">${song.songName}<span>${song.year}</span></div></td>
      <td><div class="album-thumb" data-album="${song.album}" aria-label="${song.album} album photo">${song.art}</div></td>
      <td>${song.title}</td>
      <td>${song.artist}</td>
      <td>${song.duration}</td>
      <td><button data-play="${song.id}" aria-label="Play ${song.title}">▶</button></td>
    </tr>
  `).join('');

  document.querySelectorAll('.album-thumb').forEach((thumb) => setAlbumGradient(thumb, thumb.dataset.album));
  document.querySelectorAll('#songTable tr').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.matches('button')) return;
      openDrawer(Number(row.dataset.id));
    });
  });
  document.querySelectorAll('[data-play]').forEach((button) => {
    button.addEventListener('click', () => startSong(Number(button.dataset.play)));
  });
}

function findSong(id) {
  return songs.find((song) => song.id === id) || songs[0];
}

function openDrawer(id) {
  const song = findSong(id);
  byId('drawerYear').textContent = song.year;
  byId('drawerTitle').textContent = song.title;
  byId('drawerArtist').textContent = song.artist;
  byId('drawerRelease').textContent = song.year;
  byId('drawerDuration').textContent = song.duration;
  byId('drawerArtistMeta').textContent = song.artist;
  byId('drawerAlbum').textContent = song.album;
  byId('drawerLyrics').innerHTML = `${song.lyricsNote}<br><br><strong>Lyric mood:</strong> ${song.lyricMood}`;
  byId('drawerArt').textContent = song.art;
  setAlbumGradient(byId('drawerArt'), song.album);
  byId('drawerPlay').onclick = () => startSong(song.id);
  byId('songDrawer').classList.add('open');
  byId('songDrawer').setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  byId('songDrawer').classList.remove('open');
  byId('songDrawer').setAttribute('aria-hidden', 'true');
}

function durationToSeconds(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

function secondsToTime(total) {
  const minutes = Math.floor(total / 60);
  const seconds = Math.floor(total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updatePlayer(song) {
  byId('playerTitle').textContent = song.title;
  byId('playerAlbum').textContent = `${song.artist} · ${song.album}`;
  byId('playerArt').textContent = song.art;
  byId('totalTime').textContent = song.duration;
  setAlbumGradient(byId('playerArt'), song.album);
}

function tickProgress() {
  const song = songs[activeIndex];
  const total = durationToSeconds(song.duration);
  elapsed = (elapsed + 1) % (total + 1);
  byId('currentTime').textContent = secondsToTime(elapsed);
  byId('progressFill').style.width = `${(elapsed / total) * 100}%`;
  if (elapsed >= total) nextSong();
}

function setPlaying(playing) {
  isPlaying = playing;
  byId('playPause').textContent = playing ? '⏸' : '▶';
  clearInterval(progressTimer);
  if (playing) progressTimer = setInterval(tickProgress, 1000);
}

function startSong(id) {
  activeIndex = songs.findIndex((song) => song.id === id);
  if (activeIndex < 0) activeIndex = 0;
  elapsed = 0;
  updatePlayer(songs[activeIndex]);
  byId('currentTime').textContent = '0:00';
  byId('progressFill').style.width = '0%';
  byId('audioBar').classList.add('open');
  setPlaying(true);
}

function nextSong() {
  activeIndex = (activeIndex + 1) % songs.length;
  elapsed = 0;
  updatePlayer(songs[activeIndex]);
  setPlaying(isPlaying);
}

function prevSong() {
  activeIndex = (activeIndex - 1 + songs.length) % songs.length;
  elapsed = 0;
  updatePlayer(songs[activeIndex]);
  setPlaying(isPlaying);
}

byId('songSearch').addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  filteredSongs = songs.filter((song) =>
    [song.songName, song.title, song.artist, song.album, song.year].some((value) => value.toLowerCase().includes(query))
  );
  renderSongs(filteredSongs);
});

byId('closeDrawer').addEventListener('click', closeDrawer);
byId('songDrawer').addEventListener('click', (event) => {
  if (event.target === byId('songDrawer')) closeDrawer();
});
byId('closePlayer').addEventListener('click', () => {
  byId('audioBar').classList.remove('open');
  setPlaying(false);
});
byId('playPause').addEventListener('click', () => setPlaying(!isPlaying));
byId('nextSong').addEventListener('click', nextSong);
byId('prevSong').addEventListener('click', prevSong);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDrawer();
});

renderTimeline();
renderAlbums();
renderCards('achievementGrid', achievements);
renderInnovations();
renderCards('philanthropyGrid', philanthropy);
renderTags();
renderSongs();
