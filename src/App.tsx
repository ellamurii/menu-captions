import "@mantine/core/styles.css";

import { Box, Button, Group, MantineProvider, Textarea } from "@mantine/core";
import { useState } from "react";

const DEFAULT_EMOJI = "🍽️";
const EMOJIS = [
  { emoji: "🥘", strMatch: ["pork"] },
  { emoji: "🍖", strMatch: ["beef", "spareribs"] },
  { emoji: "🍗", strMatch: ["chicken"] },
  { emoji: "🥘", strMatch: ["bam-e", "pancit"] },
  { emoji: "🥦", strMatch: ["chopsuey"] },
  { emoji: "🐟", strMatch: ["tuna", "kinilaw"] },
  { emoji: "🦀", strMatch: ["seafood"] },
  { emoji: "🍉", strMatch: ["fruit"] },
  { emoji: "🍝", strMatch: ["pasta", "spaghetti"] },
  { emoji: "🐷", strMatch: ["lechon"] },
];

const findEmojiForSentence = (sentence: string) => {
  for (const emojiData of EMOJIS) {
    for (const keyword of emojiData.strMatch) {
      if (sentence.toLowerCase().includes(keyword)) {
        return `${emojiData.emoji} ${sentence}`;
      }
    }
  }
  return `${DEFAULT_EMOJI} ${sentence}`;
};

export default function App() {
  const [rawMenu, setRawMenu] = useState("");
  const [formatted, setFormatted] = useState("");

  const onChangeInput = (val: string) => {
    setRawMenu(val);

    const items = val.split("\n").filter((f) => f);
    const matches = items.map(findEmojiForSentence);
    setFormatted(matches.join("\n"));
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      alert("Value copied to clipboard");
    } catch (error) {
      console.error("Failed to copy the value:", error);
    }
  };

  return (
    <MantineProvider>
      <Box bg="var(--mantine-color-gray-light)" w="100vw" h="100vh" p="lg">
        <Textarea
          label="Input multiple menu items separated by newline"
          minRows={6}
          autosize
          value={rawMenu}
          onChange={({ target }) => onChangeInput(target.value)}
        />
        <Textarea
          pt="lg"
          minRows={6}
          autosize
          value={formatted}
          onChange={({ target }) => setFormatted(target.value)}
        />
        <Group mt="sm">
          <Button variant="filled" onClick={handleCopyClick}>
            Copy
          </Button>
          <Button
            bg="var(--mantine-color-red-9)"
            onClick={() => onChangeInput("")}
          >
            Clear
          </Button>
        </Group>
      </Box>
    </MantineProvider>
  );
}
