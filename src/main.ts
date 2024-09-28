import { LabelerServer } from "@skyware/labeler";
import { Bot, Post } from "@skyware/bot";
import "dotenv/config";

const server = new LabelerServer({
  did: process.env.LABELER_DID,
  signingKey: process.env.SIGNING_KEY,
});

server.start(14831, (error) => {
  if (error) {
    console.error("Failed to start: ", error);
  } else {
    console.log("Listening on port 14831");
  }
});
const bot = new Bot();
await bot.login({
  identifier: process.env.LABELER_DID,
  password: process.env.LABELER_PASSWORD,
});

const postsToLabels: Record<string, string> = {
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkkq2kr2c":
    "arizona-cardinals",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkkszml2q":
    "atlanta-falcons",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkkwabo2r":
    "baltimore-ravens",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkkzmrr2p":
    "buffalo-bills",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkl4nxe2c":
    "carolina-panthers",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkl7ygt2o":
    "chicago-bears",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkld36r2i":
    "cincinnati-bengals",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adklg7vv25":
    "cleveland-browns",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkljec52p":
    "dallas-cowboys",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adklmjnp22":
    "denver-broncos",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adklpm3i2f":
    "detroit-lions",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adklso2m2c":
    "green-bay-packers",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adklvtbt2o":
    "houston-texans",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adklywc32o":
    "indianapolis-colts",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkm3x7v25":
    "jacksonville-jaguars",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkm6z232r":
    "kansas-city-chiefs",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmbvuo2a":
    "las-vegas-raiders",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmeudt2q":
    "los-angeles-chargers",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmhxak2i":
    "los-angeles-rams",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmkwjj23":
    "miami-dolphins",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmnsm32p":
    "minnesota-vikings",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmqwv724":
    "new-england-patriots",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmtwnz2i":
    "new-orleans-saints",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmww3x22":
    "new-york-giants",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkmzqsg2j":
    "new-york-jets",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkn4shy26":
    "philadelphia-eagles",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkn7snl2q":
    "pittsburgh-steelers",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkncusq26":
    "san-francisco-49ers",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adknfvsj23":
    "seattle-seahawks",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adkniug327":
    "tampa-bay-buccaneers",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adknlxxr2c":
    "tennessee-titans",
  "at://did:plc:4cbvrwtii4d5p4hymgu5sv2q/app.bsky.feed.post/3l5adknp4pj26":
    "washington-commanders",
};

bot.on("like", async ({ subject, user }) => {
  if (subject instanceof Post) {
    const label = postsToLabels[subject.uri];
    if (label) {
      await user.labelAccount([label]);
    }
  }
});

