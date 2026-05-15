export interface BlogCategory {
  label: string;
  bgColor: string;
  textColor: string;
}

export type BlogContentBlockType =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'blockquote'; text: string }
  | { type: 'list'; items: string[] };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  category?: BlogCategory;
  excerpt: string;
  image?: string;
  tags?: string[];
  readingTime?: string;
  content?: BlogContentBlockType[];
}

export const featuredPost: BlogPost = {
  id: 1,
  slug: 'scaling-microservices-rust-grpc',
  title: 'Scaling Microservices with Rust and gRPC',
  date: 'OCT 24, 2023',
  category: {
    label: 'ARCHITECTURES',
    bgColor: 'rgba(78, 222, 163, 0.1)',
    textColor: '#4edea3',
  },
  excerpt:
    'Deep dive into why we transitioned our core message broker to Rust and the 40% latency reduction we observed in production.',
  image: 'https://www.figma.com/api/mcp/asset/f887a322-a762-4bbd-bd50-cc609e0cd7b5',
  readingTime: '12 min read',
  tags: ['Rust', 'gRPC', 'Microservices', 'Architecture'],
  content: [
    {
      type: 'paragraph',
      text: 'When our engineering team first floated the idea of migrating our core message broker from Go to Rust, the room went quiet. We had a functioning system—one that had scaled us to 50,000 concurrent connections with sub-100ms p99 latency. Why fix what wasn\'t broken?',
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Turning Point',
    },
    {
      type: 'paragraph',
      text: 'The answer arrived during a post-mortem following a cascade failure triggered by a memory leak in one of our Go goroutines. The leak was subtle—triggered only under a very specific sequence of gRPC stream cancellations. By the time our alerting fired, three downstream services had already timed out.',
    },
    {
      type: 'blockquote',
      text: 'Rust\'s ownership model isn\'t just a memory safety guarantee—it\'s a forcing function that makes entire classes of concurrency bugs structurally impossible to express.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Architecture Overview',
    },
    {
      type: 'paragraph',
      text: 'Our new broker is built on Tokio, Rust\'s async runtime, with Tonic for gRPC transport. The service handles bidirectional streaming with backpressure built into the protocol layer itself. Here\'s the core stream handler:',
    },
    {
      type: 'code',
      language: 'rust',
      code: `pub async fn handle_stream(
    &self,
    mut inbound: Streaming<Payload>,
) -> Result<Response<Streaming<Ack>>, Status> {
    let (tx, rx) = mpsc::channel(128);
    tokio::spawn(async move {
        while let Some(payload) = inbound.next().await {
            let ack = process(payload?).await?;
            tx.send(Ok(ack)).await?;
        }
        Ok::<_, Box<dyn Error>>(())
    });
    Ok(Response::new(ReceiverStream::new(rx)))
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Benchmark Results',
    },
    {
      type: 'paragraph',
      text: 'After three months in production, the numbers are in. Compared to our previous Go implementation running on identical hardware:',
    },
    {
      type: 'list',
      items: [
        'p50 latency: 4.2ms → 2.1ms (50% improvement)',
        'p99 latency: 89ms → 53ms (40% improvement)',
        'Memory footprint: 1.4GB → 420MB under peak load',
        'CPU utilization: 68% → 41% at 50K connections',
        'Zero memory-related incidents in 90 days of production',
      ],
    },
    {
      type: 'heading',
      level: 3,
      text: 'Lessons Learned',
    },
    {
      type: 'paragraph',
      text: 'The migration took 14 weeks—longer than projected—primarily due to the learning curve around Rust\'s lifetime annotations in async contexts. If you\'re considering a similar path, budget 30% extra time for the team ramp-up phase. The long-term gains are absolutely worth it, but the short-term cost is real.',
    },
  ],
};

export const benchmarkPosts: BlogPost[] = [
  {
    id: 2,
    slug: 'minimalist-designers-guide-tailwind-v4',
    title: "The Minimalist Designer's Guide to Tailwind v4",
    date: 'OCT 12, 2023',
    category: {
      label: 'FRONTEND',
      bgColor: 'rgba(227, 210, 255, 0.2)',
      textColor: '#742fe5',
    },
    excerpt:
      'Leveraging zero-runtime CSS for high-performance portfolio sites without sacrificing visual depth.',
    tags: ['JS', 'TS', 'CSS', 'Tailwind'],
    readingTime: '7 min read',
    content: [
      {
        type: 'paragraph',
        text: 'Tailwind v4 represents the most significant architectural shift since the framework\'s inception. The move to a CSS-native engine means zero JavaScript at runtime, but the real story is what this unlocks for design systems at scale.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Zero-Runtime Promise',
      },
      {
        type: 'paragraph',
        text: 'In v3, the JIT compiler was a breakthrough. In v4, the engine is replaced entirely with a Rust-based CSS processor that outputs static stylesheets with no runtime overhead. For portfolio sites that prioritize Core Web Vitals, this is transformative.',
      },
      {
        type: 'code',
        language: 'css',
        code: `/* v4 uses native CSS cascade layers */
@layer base, components, utilities;

@theme {
  --color-primary: oklch(65% 0.25 250);
  --spacing-section: 4rem;
}`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Design Token Integration',
      },
      {
        type: 'paragraph',
        text: 'The new @theme directive bridges the gap between design tokens and utility classes. You define tokens once and Tailwind generates the corresponding utilities automatically—no plugin configuration required.',
      },
      {
        type: 'list',
        items: [
          'Native CSS variables for every token',
          'OKLCH color space support out of the box',
          'Container queries as first-class utilities',
          'Automatic dark mode via prefers-color-scheme',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'terminal-workflow',
    title: 'Terminal Workflow',
    date: 'OCT 05, 2023',
    excerpt: 'My curated list of Neovim plugins for maximum full-stack productivity.',
    readingTime: '5 min read',
    tags: ['Neovim', 'Terminal', 'Productivity'],
    content: [
      {
        type: 'paragraph',
        text: 'After years of VS Code and JetBrains, I migrated my entire development workflow to Neovim in 2022. This is not an ideological statement—it\'s a pragmatic one. The speed gains and keyboard-first ergonomics have compounded into hours of productivity recovered every week.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Core Plugin Stack',
      },
      {
        type: 'list',
        items: [
          'lazy.nvim — plugin manager with lazy loading',
          'nvim-treesitter — syntax parsing and highlighting',
          'telescope.nvim — fuzzy finder for everything',
          'oil.nvim — file manager as a buffer',
          'conform.nvim — async formatting',
          'nvim-lspconfig + mason — language servers',
        ],
      },
      {
        type: 'code',
        language: 'lua',
        code: `-- telescope with live grep
vim.keymap.set('n', '<leader>fg', function()
  require('telescope.builtin').live_grep({
    additional_args = { '--hidden', '--glob=!.git' }
  })
end, { desc = 'Live grep workspace' })`,
      },
    ],
  },
  {
    id: 4,
    slug: 'database-indexing-strategies',
    title: 'Database Indexing Strategies',
    date: 'SEPT 28, 2023',
    category: {
      label: 'BACKEND',
      bgColor: 'rgba(0, 240, 255, 0.1)',
      textColor: '#00dbe9',
    },
    excerpt:
      'Stop using UUIDs as primary keys without understanding the B-Tree fragmentation cost.',
    image: 'https://www.figma.com/api/mcp/asset/0babf754-69ca-4ce9-89cd-60d54b7941df',
    readingTime: '9 min read',
    tags: ['PostgreSQL', 'Indexing', 'Performance', 'SQL'],
    content: [
      {
        type: 'paragraph',
        text: 'UUID v4 primary keys are the silent performance killers of modern web applications. They look clean, they\'re globally unique, and they cause catastrophic B-Tree fragmentation at scale. Let\'s talk about why—and what to do instead.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The B-Tree Problem',
      },
      {
        type: 'paragraph',
        text: 'B-Tree indexes perform best when new entries are inserted in sequential order. A UUID v4 is randomly distributed across the entire key space, meaning every INSERT causes a page split somewhere in the middle of the tree. At 10M rows, this translates to a bloated index that is 40-60% larger than necessary.',
      },
      {
        type: 'code',
        language: 'sql',
        code: `-- Avoid: random UUID fragmentation
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ
);

-- Prefer: UUIDv7 (time-sortable) or ULID
CREATE TABLE events (
  id TEXT PRIMARY KEY DEFAULT gen_ulid(),
  created_at TIMESTAMPTZ
);`,
      },
      {
        type: 'blockquote',
        text: 'At 10 million rows, switching from UUIDv4 to UUIDv7 reduced our index size by 47% and cut p99 INSERT latency from 23ms to 6ms.',
      },
    ],
  },
  {
    id: 5,
    slug: 'ai-driven-code-reviews',
    title: 'AI-Driven Code Reviews',
    date: 'SEPT 15, 2023',
    category: {
      label: 'DEVOPS',
      bgColor: 'rgba(255, 200, 0, 0.1)',
      textColor: '#f0c000',
    },
    excerpt:
      "Integrating LLMs into the CI/CD pipeline to catch edge cases before human review.",
    readingTime: '8 min read',
    tags: ['AI', 'CI/CD', 'LLM', 'GitHub Actions'],
    content: [
      {
        type: 'paragraph',
        text: 'The pull request review bottleneck is one of the most persistent sources of engineering throughput loss. Senior engineers spend hours per week reviewing code that an LLM could have pre-screened in seconds. Here\'s the pipeline we built.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Review Pipeline',
      },
      {
        type: 'code',
        language: 'yaml',
        code: `# .github/workflows/ai-review.yml
name: AI Code Review
on: [pull_request]

jobs:
  ai-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Run AI review
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
        run: |
          git diff origin/main...HEAD | \\
          python scripts/ai_review.py --post-comment`,
      },
      {
        type: 'list',
        items: [
          'Catches missing null checks and unhandled promise rejections',
          'Flags potential N+1 query patterns in ORM usage',
          'Identifies missing test coverage for new code paths',
          'Suggests performance improvements for obvious hotspots',
          'Reduces human review time by ~35% in our team',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'the-state-of-webgpu',
    title: 'The State of WebGPU',
    date: 'SEPT 02, 2023',
    category: {
      label: 'FRONTEND',
      bgColor: 'rgba(227, 210, 255, 0.2)',
      textColor: '#742fe5',
    },
    excerpt: 'WebGPU is finally shipping in stable browsers. Here\'s what it means for web-based visualization.',
    readingTime: '6 min read',
    tags: ['WebGPU', 'Canvas', 'GPU', 'Browser'],
    content: [
      {
        type: 'paragraph',
        text: 'WebGPU shipped in Chrome 113 in May 2023, ending years of anticipation. Unlike WebGL, which was a thin wrapper over OpenGL ES 2.0, WebGPU is a modern GPU API designed from the ground up for the constraints of the web platform.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why It Matters',
      },
      {
        type: 'paragraph',
        text: 'WebGL\'s threading model meant that complex compute shaders had to live on the main thread, blocking UI rendering. WebGPU separates the compute and rendering pipelines and exposes GPU compute through a modern async API.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const computePipeline = device.createComputePipeline({
  layout: 'auto',
  compute: {
    module: device.createShaderModule({ code: wgslCode }),
    entryPoint: 'main',
  },
});`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Browser Support in 2023',
      },
      {
        type: 'list',
        items: [
          'Chrome 113+ — stable, full support',
          'Edge 113+ — stable, mirrors Chrome',
          'Firefox — behind flag (dom.webgpu.enabled)',
          'Safari 18 — partial support, improving rapidly',
        ],
      },
    ],
  },
];

export const allPosts: BlogPost[] = [featuredPost, ...benchmarkPosts];

export function getPostById(id: number): BlogPost | undefined {
  return allPosts.find((p) => p.id === id);
}
