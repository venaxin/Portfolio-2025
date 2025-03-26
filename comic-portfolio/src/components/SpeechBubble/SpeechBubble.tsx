// Create a SpeechBubble component
export function SpeechBubble({ text }: { text: string }) {
    return (
      <div className="speech-bubble">
        <div className="bubble-tail" />
        {text}
      </div>
    )
  }