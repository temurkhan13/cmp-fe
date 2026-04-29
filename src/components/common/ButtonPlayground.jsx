import Button from './Button';

const VARIANTS = ['primary', 'secondary', 'destructive', 'ghost', 'link', 'icon', 'toggle'];
const SIZES = ['sm', 'md', 'lg'];

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const sectionStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
  background: '#fff',
};
const rowStyle = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', margin: '8px 0' };
const labelStyle = { fontSize: '12px', color: '#6d7277', minWidth: '120px', fontFamily: 'monospace' };
const h2Style = { fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#0b1444' };
const h1Style = { fontSize: '24px', fontWeight: 700, marginBottom: '4px', color: '#0b1444' };

const ButtonPlayground = () => {
  return (
    <div style={{ padding: '32px', background: '#f9f9f9', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={h1Style}>Button Playground</h1>
      <p style={{ color: '#6d7277', marginBottom: '24px', fontSize: '13px' }}>
        Visual QA grid for the new <code>&lt;Button&gt;</code> — see <code>BUTTON_DISCOVERY.md § 8.1</code>.
      </p>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Variant × Size matrix</h2>
        {VARIANTS.map((variant) => (
          <div key={variant} style={rowStyle}>
            <span style={labelStyle}>variant=&quot;{variant}&quot;</span>
            {SIZES.map((size) => (
              <Button
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                ariaLabel={variant === 'icon' ? `Add (${size})` : undefined}
              >
                {variant === 'icon' ? <PlusIcon /> : `${variant} ${size}`}
              </Button>
            ))}
          </div>
        ))}
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>States</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>disabled</span>
          {VARIANTS.filter((v) => v !== 'icon').map((v) => (
            <Button key={v} variant={v} disabled>
              {v}
            </Button>
          ))}
          <Button variant="icon" disabled ariaLabel="Add">
            <PlusIcon />
          </Button>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>loading</span>
          {VARIANTS.filter((v) => v !== 'icon' && v !== 'link').map((v) => (
            <Button key={v} variant={v} loading>
              Saving…
            </Button>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Toggle (active vs inactive)</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>active=false</span>
          <Button variant="toggle">Monthly</Button>
          <Button variant="toggle">Yearly</Button>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>active=true</span>
          <Button variant="toggle" active>Monthly</Button>
          <Button variant="toggle" active>Yearly</Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Icons (left / right)</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>iconLeft</span>
          <Button variant="primary" iconLeft={<PlusIcon />}>Create new</Button>
          <Button variant="secondary" iconLeft={<PlusIcon />}>Add item</Button>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>iconRight</span>
          <Button variant="primary" iconRight={<PlusIcon />}>Continue</Button>
          <Button variant="ghost" iconRight={<PlusIcon />}>More</Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Auth-provider pattern (D9)</h2>
        <div style={rowStyle}>
          <span style={labelStyle}>secondary lg + iconLeft</span>
          <Button variant="secondary" size="lg" iconLeft={<PlusIcon />}>Continue with Google</Button>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>+ block (full-width)</span>
          <div style={{ flex: 1, maxWidth: 480 }}>
            <Button variant="secondary" size="lg" block iconLeft={<PlusIcon />}>
              Continue with Google
            </Button>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Block (full-width form CTAs)</h2>
        <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'stretch', maxWidth: 480 }}>
          <Button variant="primary" block>Log In</Button>
          <Button variant="secondary" block>Cancel</Button>
          <Button variant="primary" block size="lg">Continue</Button>
          <Button variant="primary" block loading>Logging in…</Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>type=&quot;submit&quot; check</h2>
        <form
          style={rowStyle}
          onSubmit={(e) => {
            e.preventDefault();
            alert('submit fired');
          }}
        >
          <span style={labelStyle}>inside &lt;form&gt;</span>
          <Button type="submit" variant="primary">Submit form</Button>
        </form>
      </section>
    </div>
  );
};

export default ButtonPlayground;
