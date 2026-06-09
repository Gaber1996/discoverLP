const columns = [
  {
    left: '5%',
    duration: '45s',
    lines: [
      { text: 'const [state, setState] = useState()', color: 'text-syntax-green' },
      { text: '  return <Component {...props} />', color: 'text-syntax-purple' },
      { text: 'interface Props {', color: 'text-syntax-purple' },
      { text: '  children: ReactNode', color: 'text-white' },
      { text: '}', color: 'text-white' },
      { text: 'await fetch("/api/data")', color: 'text-syntax-orange' },
      { text: 'export default function App() {', color: 'text-syntax-green' },
      { text: '  const router = useRouter()', color: 'text-white' },
      { text: 'type Result<T> = Success<T> | Error', color: 'text-syntax-purple' },
      { text: '  if (!user) return null', color: 'text-syntax-green' },
    ],
  },
  {
    left: '22%',
    duration: '38s',
    lines: [
      { text: 'useEffect(() => {', color: 'text-syntax-green' },
      { text: '  const cleanup = subscribe()', color: 'text-white' },
      { text: '  return () => cleanup()', color: 'text-white' },
      { text: '}, [])', color: 'text-syntax-green' },
      { text: 'import { motion } from "framer-motion"', color: 'text-syntax-orange' },
      { text: 'const variants = {', color: 'text-syntax-green' },
      { text: '  hidden: { opacity: 0 },', color: 'text-white' },
      { text: '  visible: { opacity: 1 },', color: 'text-white' },
      { text: '}', color: 'text-white' },
      { text: '<AnimatePresence mode="wait">', color: 'text-syntax-purple' },
    ],
  },
  {
    left: '40%',
    duration: '52s',
    lines: [
      { text: 'async function getData() {', color: 'text-syntax-green' },
      { text: '  const res = await db.query()', color: 'text-white' },
      { text: '  return res.rows.map(transform)', color: 'text-white' },
      { text: '}', color: 'text-white' },
      { text: 'export const config = {', color: 'text-syntax-green' },
      { text: '  runtime: "edge",', color: 'text-syntax-orange' },
      { text: '  regions: ["iad1"],', color: 'text-syntax-orange' },
      { text: '}', color: 'text-white' },
      { text: 'const schema = z.object({', color: 'text-syntax-purple' },
      { text: '  email: z.string().email(),', color: 'text-white' },
    ],
  },
  {
    left: '58%',
    duration: '35s',
    lines: [
      { text: 'export type Theme = "dark" | "light"', color: 'text-syntax-purple' },
      { text: 'const ctx = createContext<Theme>("dark")', color: 'text-syntax-green' },
      { text: 'function useTheme() {', color: 'text-syntax-green' },
      { text: '  return useContext(ctx)', color: 'text-white' },
      { text: '}', color: 'text-white' },
      { text: 'const [count, setCount] = useState(0)', color: 'text-syntax-green' },
      { text: 'useMemo(() => expensive(data), [data])', color: 'text-white' },
      { text: 'const debounced = useDebouncedValue(query)', color: 'text-white' },
      { text: 'return <>{children}</>', color: 'text-syntax-purple' },
      { text: '// TODO: add error boundary', color: 'text-syntax-orange' },
    ],
  },
  {
    left: '75%',
    duration: '42s',
    lines: [
      { text: 'describe("auth", () => {', color: 'text-syntax-green' },
      { text: '  it("returns 401 without token", async () => {', color: 'text-white' },
      { text: '    const res = await request(app).get("/me")', color: 'text-white' },
      { text: '    expect(res.status).toBe(401)', color: 'text-syntax-orange' },
      { text: '  })', color: 'text-white' },
      { text: '})', color: 'text-white' },
      { text: 'CREATE TABLE users (', color: 'text-syntax-purple' },
      { text: '  id SERIAL PRIMARY KEY,', color: 'text-white' },
      { text: '  email VARCHAR(255) UNIQUE', color: 'text-white' },
      { text: ');', color: 'text-white' },
    ],
  },
  {
    left: '90%',
    duration: '48s',
    lines: [
      { text: 'docker compose up -d', color: 'text-syntax-green' },
      { text: 'FROM node:20-alpine', color: 'text-syntax-purple' },
      { text: 'WORKDIR /app', color: 'text-white' },
      { text: 'COPY package*.json ./', color: 'text-white' },
      { text: 'RUN npm ci --production', color: 'text-syntax-orange' },
      { text: 'EXPOSE 3000', color: 'text-white' },
      { text: 'CMD ["node", "dist/index.js"]', color: 'text-syntax-orange' },
      { text: 'git commit -m "feat: deploy pipeline"', color: 'text-syntax-green' },
      { text: 'npm run build && npm run start', color: 'text-white' },
      { text: '# DiscoverDev 2025', color: 'text-syntax-purple' },
    ],
  },
];

export default function CodeWaterfall() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.07] hidden lg:block">
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute top-0 flex flex-col gap-3 font-mono text-[11px] leading-5 whitespace-nowrap"
          style={{
            left: col.left,
            animation: `code-scroll ${col.duration} linear infinite`,
            willChange: 'transform',
          }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex flex-col gap-3">
              {col.lines.map((line, j) => (
                <span key={`${copy}-${j}`} className={line.color}>
                  {line.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
