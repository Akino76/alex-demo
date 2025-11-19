export default function Home() {
  return (
    <div className="desktop-root">
      <div className="desktop-bg" />

      <a
        href="/alex"
        className="desktop-folder"
        aria-label="Project folder - alex-demo"
      >
        <div className="folder-icon" aria-hidden>
          <div className="folder-top" />
          <div className="folder-body" />
        </div>
        <div className="folder-label">alex-demo</div>
      </a>

      <div className="desktop-instructions">
        <div>Retro Macintosh desktop — click the folder to open project</div>
      </div>
    </div>
  );
}
