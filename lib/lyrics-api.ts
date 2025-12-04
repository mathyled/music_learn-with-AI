export interface Song {
  id: number
  title: string
  artist: string
  album?: string
  year?: string
  lyrics: string
  youtubeId?: string
}

// Base de datos de 10 canciones con letras completas
 export const SAMPLE_SONGS: Song[] = [
  {
    id: 1,
    title: "One",
    artist: "Metallica",
    album: "...And Justice for All",
    year: "1988",
    youtubeId: "WM8bTdBs-cw",
    lyrics: `I can't remember anything
Can't tell if this is true or dream
Deep down inside I feel to scream
This terrible silence stops me

Now that the war is through with me
I'm waking up, I cannot see
That there's not much left of me
Nothing is real but pain now

Hold my breath as I wish for death
Oh please God, wake me

Back in the womb it's much too real
In pumps life that I must feel
But can't look forward to reveal
Look to the time when I'll live

Fed through the tube that sticks in me
Just like a wartime novelty
Tied to machines that make me be
Cut this life off from me

Hold my breath as I wish for death
Oh please God, wake me

Now the world is gone, I'm just one
Oh God, help me
Hold my breath as I wish for death
Oh please God, help me

Darkness imprisoning me
All that I see
Absolute horror
I cannot live
I cannot die
Trapped in myself
Body my holding cell

Landmine has taken my sight
Taken my speech
Taken my hearing
Taken my arms
Taken my legs
Taken my soul
Left me with life in hell`,
  },
  {
    id: 2,
    title: "Yesterday",
    artist: "The Beatles",
    album: "Help!",
    year: "1965",
    youtubeId: "wXTJBr9tt8Q",
    lyrics: `Yesterday, all my troubles seemed so far away
Now it looks as though they're here to stay
Oh, I believe in yesterday

Suddenly, I'm not half the man I used to be
There's a shadow hanging over me
Oh, yesterday came suddenly

Why she had to go, I don't know, she wouldn't say
I said something wrong, now I long for yesterday

Yesterday, love was such an easy game to play
Now I need a place to hide away
Oh, I believe in yesterday

Why she had to go, I don't know, she wouldn't say
I said something wrong, now I long for yesterday

Yesterday, love was such an easy game to play
Now I need a place to hide away
Oh, I believe in yesterday`,
  },
  {
    id: 3,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: "1975",
    youtubeId: "fJ9rUzIMcZQ",
    lyrics: `Is this the real life? Is this just fantasy?
Caught in a landslide, no escape from reality
Open your eyes, look up to the skies and see
I'm just a poor boy, I need no sympathy
Because I'm easy come, easy go, little high, little low
Any way the wind blows doesn't really matter to me, to me

Mama, just killed a man
Put a gun against his head, pulled my trigger, now he's dead
Mama, life had just begun
But now I've gone and thrown it all away

Mama, ooh, didn't mean to make you cry
If I'm not back again this time tomorrow
Carry on, carry on as if nothing really matters

Too late, my time has come
Sends shivers down my spine, body's aching all the time
Goodbye, everybody, I've got to go
Gotta leave you all behind and face the truth

Mama, ooh (Any way the wind blows)
I don't wanna die
I sometimes wish I'd never been born at all`,
  },
  {
    id: 4,
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    year: "1971",
    youtubeId: "YkgkThdzX-8",
    lyrics: `Imagine there's no heaven
It's easy if you try
No hell below us
Above us only sky
Imagine all the people
Living for today

Imagine there's no countries
It isn't hard to do
Nothing to kill or die for
And no religion too
Imagine all the people
Living life in peace

You may say I'm a dreamer
But I'm not the only one
I hope someday you'll join us
And the world will be as one

Imagine no possessions
I wonder if you can
No need for greed or hunger
A brotherhood of man
Imagine all the people
Sharing all the world

You may say I'm a dreamer
But I'm not the only one
I hope someday you'll join us
And the world will live as one`,
  },
  {
    id: 5,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    year: "1976",
    youtubeId: "09839DpTctU",
    lyrics: `On a dark desert highway, cool wind in my hair
Warm smell of colitas, rising up through the air
Up ahead in the distance, I saw a shimmering light
My head grew heavy and my sight grew dim
I had to stop for the night

There she stood in the doorway
I heard the mission bell
And I was thinking to myself
This could be heaven or this could be hell
Then she lit up a candle and she showed me the way
There were voices down the corridor
I thought I heard them say

Welcome to the Hotel California
Such a lovely place (Such a lovely place)
Such a lovely face
Plenty of room at the Hotel California
Any time of year (Any time of year)
You can find it here

Her mind is Tiffany-twisted, she got the Mercedes bends
She got a lot of pretty, pretty boys she calls friends
How they dance in the courtyard, sweet summer sweat
Some dance to remember, some dance to forget

So I called up the Captain
Please bring me my wine
He said, We haven't had that spirit here since nineteen sixty nine
And still those voices are calling from far away
Wake you up in the middle of the night
Just to hear them say

Welcome to the Hotel California
Such a lovely place (Such a lovely place)
Such a lovely face
They livin' it up at the Hotel California
What a nice surprise (What a nice surprise)
Bring your alibis`,
  },
  {
    id: 6,
    title: "Let It Be",
    artist: "The Beatles",
    album: "Let It Be",
    year: "1970",
    youtubeId: "QDYfEBY9NM4",
    lyrics: `When I find myself in times of trouble
Mother Mary comes to me
Speaking words of wisdom, let it be
And in my hour of darkness
She is standing right in front of me
Speaking words of wisdom, let it be

Let it be, let it be
Let it be, let it be
Whisper words of wisdom, let it be

And when the broken hearted people
Living in the world agree
There will be an answer, let it be
For though they may be parted
There is still a chance that they will see
There will be an answer, let it be

Let it be, let it be
Let it be, let it be
Yeah, there will be an answer, let it be

Let it be, let it be
Let it be, let it be
Whisper words of wisdom, let it be`,
  },
  {
    id: 7,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    year: "1982",
    youtubeId: "Zi_XLOBDo_Y",
    lyrics: `She was more like a beauty queen from a movie scene
I said don't mind, but what do you mean, I am the one
Who will dance on the floor in the round
She said I am the one, who will dance on the floor in the round

She told me her name was Billie Jean, as she caused a scene
Then every head turned with eyes that dreamed of being the one
Who will dance on the floor in the round

People always told me be careful of what you do
And don't go around breaking young girls' hearts
And mother always told me be careful of who you love
And be careful of what you do 'cause the lie becomes the truth

Billie Jean is not my lover
She's just a girl who claims that I am the one
But the kid is not my son
She says I am the one, but the kid is not my son`,
  },
  {
    id: 8,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    year: "1991",
    youtubeId: "hTWKbfoikeg",
    lyrics: `Load up on guns, bring your friends
It's fun to lose and to pretend
She's over-bored and self-assured
Oh no, I know a dirty word

Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello

With the lights out, it's less dangerous
Here we are now, entertain us
I feel stupid and contagious
Here we are now, entertain us
A mulatto, an albino, a mosquito, my libido
Yeah, hey

I'm worse at what I do best
And for this gift I feel blessed
Our little group has always been
And always will until the end

Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello`,
  },
  {
    id: 9,
    title: "Don't Stop Believin'",
    artist: "Journey",
    album: "Escape",
    year: "1981",
    youtubeId: "1k8craCGpgs",
    lyrics: `Just a small town girl, livin' in a lonely world
She took the midnight train goin' anywhere
Just a city boy, born and raised in south Detroit
He took the midnight train goin' anywhere

A singer in a smokey room
The smell of wine and cheap perfume
For a smile they can share the night
It goes on and on, and on, and on

Strangers waiting, up and down the boulevard
Their shadows searching in the night
Streetlights people, living just to find emotion
Hiding, somewhere in the night

Working hard to get my fill
Everybody wants a thrill
Payin' anything to roll the dice
Just one more time
Some will win, some will lose
Some were born to sing the blues
Oh, the movie never ends
It goes on and on, and on, and on

Strangers waiting, up and down the boulevard
Their shadows searching in the night
Streetlights people, living just to find emotion
Hiding, somewhere in the night

Don't stop believin'
Hold on to that feelin'
Streetlight people`,
  },
  {
    id: 10,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    year: "1987",
    youtubeId: "1w7OgIMMRc4",
    lyrics: `She's got a smile that it seems to me
Reminds me of childhood memories
Where everything was as fresh as the bright blue sky
Now and then when I see her face
She takes me away to that special place
And if I stared too long
I'd probably break down and cry

Whoa, whoa, whoa, sweet child o' mine
Whoa, oh, oh, oh, sweet love of mine

She's got eyes of the bluest skies
As if they thought of rain
I'd hate to look into those eyes and see an ounce of pain
Her hair reminds me of a warm safe place
Where as a child I'd hide
And pray for the thunder and the rain to quietly pass me by

Whoa, whoa, whoa, sweet child o' mine
Ooh, oh, oh, oh, sweet love of mine

Where do we go?
Where do we go now?
Where do we go?
Ooh, where do we go?
Where do we go now?
Oh, where do we go now?
Where do we go? (Sweet child)
Ooh, where do we go now?
Ay, ay, ay, ay, ay, ay, ay, ay
Where do we go now? Ah, ah
Where do we go?
Oh, where do we go now?
Oh, where do we go?
Where do we go now?
Where do we go?
Ooh, where do we go now?
Now, now, now, now, now, now, now
Sweet child, sweet child o' mine`,
  },
]

function fuzzyMatch(str: string, pattern: string): boolean {
  const strLower = str.toLowerCase()
  const patternLower = pattern.toLowerCase()

  if (strLower.includes(patternLower)) {
    return true
  }

  const words = patternLower.split(/\s+/)
  return words.every((word) => strLower.includes(word))
}

export async function searchSongs(query: string): Promise<Song[]> {
  if (!query.trim()) {
    return SAMPLE_SONGS
  }

  const results = SAMPLE_SONGS.filter((song) => {
    return (
      fuzzyMatch(song.title, query) || fuzzyMatch(song.artist, query) || (song.album && fuzzyMatch(song.album, query))
    )
  })

  return results
}

export async function getSongById(id: number): Promise<Song | null> {
  const song = SAMPLE_SONGS.find((s) => s.id === id)
  return song || null
}

export async function getAllSongs(): Promise<Song[]> {
  return SAMPLE_SONGS
}
