import { createSignal } from "solid-js";

import Button from "~/components/ui/Button";
import Textarea from "~/components/ui/Textarea";

export default function () {
  const [text, setText] = createSignal("");
  const [isEncoding, setIsEncoding] = createSignal(true);

  const encode = (str: string) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(str)));
  const decode = (str: string) => {
    try {
      return new TextDecoder().decode(
        Uint8Array.from(atob(str), (c) => c.charCodeAt(0)),
      );
    } catch {
      return "";
    }
  };

  const result = () => (isEncoding() ? encode(text()) : decode(text()));

  return (
    <>
      <Textarea
        value={text()}
        onInput={(e) => setText(e.target.value)}
        placeholder={
          isEncoding() ? "Enter text to encode" : "Enter base64 to decode"
        }
      />
      <Textarea value={result()} readOnly placeholder="Output" />
      <Button
        onClick={() => {
          const output = result();
          if (output) {
            setText(output);
          }
          setIsEncoding(!isEncoding());
        }}
      >
        Switch to {isEncoding() ? "Decoding" : "Encoding"}
      </Button>
    </>
  );
}
