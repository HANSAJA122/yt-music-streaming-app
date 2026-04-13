# MongoDB Schema

## users
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- avatar: String
- likedSongs: [TrackRef]
- recentlyPlayed: [TrackRef]
- createdAt, updatedAt

## playlists
- user: ObjectId (ref: users, required)
- title: String (required)
- description: String
- coverImage: String
- tracks: [TrackRef]
- isPublic: Boolean
- createdAt, updatedAt

## TrackRef (embedded)
- videoId: String (required)
- title: String (required)
- channelTitle: String (required)
- thumbnail: String (required)
- duration: String
- playedAt: Date (recentlyPlayed only)
