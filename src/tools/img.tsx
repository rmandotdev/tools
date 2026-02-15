import { createSignal, onCleanup, Show } from "solid-js";
import Button from "#components/ui/Button";
import Switcher from "#components/ui/Switcher";

export default function ImagePasteHandler() {
  type Mode = "preview" | "download";
  const [mode, setMode] = createSignal<Mode>("preview");

  const [image, setImage] = createSignal<{
    file: File;
    previewUrl: string;
  }>();

  const triggerDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name || "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          const prev = image();
          if (prev) URL.revokeObjectURL(prev.previewUrl);

          const previewUrl = URL.createObjectURL(file);
          setImage({ file, previewUrl });

          if (mode() === "download") {
            triggerDownload(file);
          }

          return;
        }
      }
    }
  };

  onCleanup(() => {
    const current = image();
    if (current) URL.revokeObjectURL(current.previewUrl);
  });

  return (
    <div onPaste={handlePaste}>
      <div class="flex justify-center mb-6">
        <Switcher<Mode>
          onChange={setMode}
          value={mode}
          options={[
            { label: "Preview", value: "preview" },
            { label: "Download", value: "download" },
          ]}
        />
      </div>

      <p class="text-gray-600 text-center">
        {"Paste an image with "}
        <kbd class="px-1.5 py-0.5 bg-gray-200 rounded">Ctrl+V</kbd>
        {" / "}
        <kbd class="px-1.5 py-0.5 bg-gray-200 rounded">Cmd+V</kbd>
      </p>

      <Show when={image()}>
        {(img) => (
          <div class="mt-8 flex flex-col items-center">
            <img
              src={img().previewUrl}
              alt="Pasted preview"
              class="max-w-full max-h-100 object-contain rounded-lg border border-gray-300 shadow-sm"
            />

            <div class="mt-5 flex gap-3">
              <Button
                onClick={() => {
                  const current = image();
                  if (current) triggerDownload(current.file);
                }}
              >
                Download Image
              </Button>
              <Button
                onClick={() => {
                  const current = image();
                  if (current) {
                    window.open(current.previewUrl, "_blank");
                  }
                }}
              >
                Open in New Tab
              </Button>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}
