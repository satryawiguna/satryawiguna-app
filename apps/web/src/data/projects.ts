export interface ProjectCategory {
  label: string;
  bgColor: string;
  textColor: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ArchitectureItem {
  icon: string; // MUI icon name
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface Capability {
  icon: string; // MUI icon name
  title: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  icon: string; // path to local SVG or external URL
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  techStack: string[];
  // Detail page fields
  role: string;
  period: string;
  liveSiteUrl?: string;
  githubUrl?: string;
  detailImage: string;
  metrics: ProjectMetric[];
  challenge: string;
  architectureItems: ArchitectureItem[];
  capabilities: Capability[];
  techStackDetailed: TechStackItem[];
  ctaTitle: string;
  ctaDescription: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'neuralnet-optimizer',
    title: 'NeuralNet Optimizer',
    description:
      'A distributed load-balancing system designed for large-scale machine learning training clusters. Reduced latency by 42%…',
    image: 'https://www.figma.com/api/mcp/asset/8f5e182f-0493-4e00-b83a-1622ca303068',
    category: { label: 'INFRASTRUCTURE', bgColor: 'rgba(0, 105, 112, 0.1)', textColor: '#006970' },
    techStack: ['Rust', 'Kubernetes', 'gRPC'],
    role: 'LEAD ARCHITECT',
    period: 'Q1 2022 - Q4 2022',
    liveSiteUrl: '#',
    githubUrl: '#',
    detailImage: 'https://www.figma.com/api/mcp/asset/8f5e182f-0493-4e00-b83a-1622ca303068',
    metrics: [
      { value: '42%', label: 'LATENCY REDUCTION' },
      { value: '10K+', label: 'GPU NODES' },
      { value: '99.8%', label: 'SYSTEM UPTIME' },
      { value: '24/7', label: 'AUTO SCALING' },
    ],
    challenge:
      'Existing ML training pipelines suffered from severe bottlenecks when scaling beyond hundreds of nodes. The core issue was uneven workload distribution across GPU clusters, leading to idle resources and dramatically increased training times for large-scale models.',
    architectureItems: [
      {
        icon: 'Hub',
        title: 'Distributed Load Balancer',
        description:
          'Custom Rust-based scheduler that dynamically distributes tensor operations across GPU nodes using a work-stealing algorithm.',
        highlighted: false,
      },
      {
        icon: 'Storage',
        title: 'Gradient Aggregation',
        description:
          'Implemented ring-allreduce with gRPC streaming for efficient gradient synchronization, reducing communication overhead by 60%.',
        highlighted: true,
      },
      {
        icon: 'Security',
        title: 'Fault Tolerance Layer',
        description:
          'Kubernetes-native health checks with automatic checkpoint recovery to resume training from the last stable state on node failure.',
        highlighted: false,
      },
    ],
    capabilities: [
      {
        icon: 'Speed',
        title: 'Auto-Scaling',
        description:
          'Dynamically provisions and deprovisions GPU nodes based on queue depth and training throughput metrics.',
      },
      {
        icon: 'Timeline',
        title: 'Live Profiling',
        description:
          'Continuous performance profiling of each training step with flame graph visualization and bottleneck alerts.',
      },
      {
        icon: 'Psychology',
        title: 'Smart Scheduling',
        description:
          'ML-based job scheduler that predicts optimal resource allocation based on historical training patterns.',
      },
    ],
    techStackDetailed: [
      { name: 'Rust', icon: '/assets/icons/typescript.svg' },
      { name: 'Kubernetes', icon: '/assets/icons/docker.svg' },
      { name: 'gRPC', icon: '/assets/icons/nestjs.svg' },
      { name: 'Python', icon: '/assets/icons/python.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
    ],
    ctaTitle: 'Interested in the technical breakdown?',
    ctaDescription:
      "I've written a detailed technical whitepaper on the distributed architecture of NeuralNet Optimizer. Feel free to explore the codebase or reach out for a deep dive.",
  },
  {
    id: 2,
    slug: 'ethereal-ledger',
    title: 'Ethereal Ledger',
    description:
      'High-throughput blockchain indexing engine providing real-time analytics for DeFi protocols. Optimized for sub-second query…',
    image: 'https://www.figma.com/api/mcp/asset/493518e8-9a63-4780-92a8-7a841d5f91d8',
    category: { label: 'FINTECH', bgColor: 'rgba(0, 165, 114, 0.1)', textColor: '#4edea3' },
    techStack: ['TypeScript', 'PostgreSQL', 'AWS Lambda'],
    role: 'FULL STACK LEAD',
    period: 'Q2 2022 - Q2 2023',
    liveSiteUrl: '#',
    githubUrl: '#',
    detailImage: 'https://www.figma.com/api/mcp/asset/493518e8-9a63-4780-92a8-7a841d5f91d8',
    metrics: [
      { value: '1M+', label: 'DAILY EVENTS' },
      { value: '<50ms', label: 'QUERY LATENCY' },
      { value: '99.9%', label: 'UPTIME' },
      { value: '50+', label: 'DeFi PROTOCOLS' },
    ],
    challenge:
      'DeFi protocols generate millions of on-chain events daily. Existing indexers struggled with re-org handling and cross-chain data consistency, making real-time analytics unreliable and fragile during high-throughput market events.',
    architectureItems: [
      {
        icon: 'AccountTree',
        title: 'Event-Driven Indexer',
        description:
          'TypeScript-based indexer using AWS Lambda for parallel block processing with guaranteed at-least-once event delivery.',
        highlighted: false,
      },
      {
        icon: 'Storage',
        title: 'Distributed PostgreSQL',
        description:
          'Globally sharded PostgreSQL cluster with automated partitioning and time-series optimization for sub-second analytics queries.',
        highlighted: true,
      },
      {
        icon: 'Shield',
        title: 'Re-org Protection',
        description:
          'Multi-confirmation finality system with automatic rollback and re-indexing triggered by chain reorganization events.',
        highlighted: false,
      },
    ],
    capabilities: [
      {
        icon: 'ShowChart',
        title: 'Real-time Analytics',
        description:
          'Live dashboards for liquidity pools, trading volumes, and protocol TVL with sub-second data freshness.',
      },
      {
        icon: 'Lan',
        title: 'Multi-chain Support',
        description:
          'Unified indexing layer for EVM-compatible chains including Ethereum, Polygon, Arbitrum, and Optimism.',
      },
      {
        icon: 'Api',
        title: 'GraphQL API',
        description:
          'Flexible GraphQL endpoint with subscriptions for real-time data streaming and complex relational queries.',
      },
    ],
    techStackDetailed: [
      { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
      { name: 'AWS Lambda', icon: '/assets/icons/aws.svg' },
      { name: 'React.js', icon: '/assets/icons/react.svg' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
      { name: 'Python', icon: '/assets/icons/python.svg' },
    ],
    ctaTitle: 'Interested in the technical breakdown?',
    ctaDescription:
      "I've written a detailed technical whitepaper on the architecture of Ethereal Ledger. Feel free to explore the codebase or reach out for a deep dive.",
  },
  {
    id: 3,
    slug: 'obsidian-cli',
    title: 'Obsidian CLI',
    description:
      'A terminal-based toolkit for rapid application scaffolding and deployment. Features a custom TUI built for speed and developer…',
    image: 'https://www.figma.com/api/mcp/asset/5783e1ef-d846-41e0-b8ff-7ec4db324c5d',
    category: {
      label: 'DEVELOPER TOOLS',
      bgColor: 'rgba(227, 210, 255, 0.1)',
      textColor: '#742fe5',
    },
    techStack: ['Go', 'Docker', 'Cobra'],
    role: 'SOLE DEVELOPER',
    period: 'Q3 2021 - Q1 2022',
    liveSiteUrl: '#',
    githubUrl: '#',
    detailImage: 'https://www.figma.com/api/mcp/asset/5783e1ef-d846-41e0-b8ff-7ec4db324c5d',
    metrics: [
      { value: '5K+', label: 'GITHUB STARS' },
      { value: '200ms', label: 'SCAFFOLD TIME' },
      { value: '30+', label: 'TEMPLATES' },
      { value: '10+', label: 'LANGUAGES' },
    ],
    challenge:
      'Developer tooling ecosystems had fragmented scaffolding tools requiring heavy configuration and slow build times. Teams wasted hours setting up CI/CD pipelines and Docker environments, especially for polyglot microservice architectures.',
    architectureItems: [
      {
        icon: 'Terminal',
        title: 'Cobra CLI Framework',
        description:
          'Built on Cobra for composable command hierarchies, enabling extensible plugin architecture for custom project templates.',
        highlighted: false,
      },
      {
        icon: 'Storage',
        title: 'Template Engine',
        description:
          'Go text/template based scaffolding engine with dynamic variable injection and conditional file generation.',
        highlighted: true,
      },
      {
        icon: 'CloudUpload',
        title: 'Docker Integration',
        description:
          'Native Docker SDK integration for automatic containerization and multi-stage build optimization of generated projects.',
        highlighted: false,
      },
    ],
    capabilities: [
      {
        icon: 'FlashOn',
        title: 'Instant Scaffold',
        description:
          'Full project scaffolding in under 200ms using pre-compiled templates and parallel file generation.',
      },
      {
        icon: 'Extension',
        title: 'Plugin System',
        description:
          'Extensible plugin API allowing teams to publish custom templates to a shared registry.',
      },
      {
        icon: 'Cloud',
        title: 'Auto Deploy',
        description:
          'One-command deployment to Kubernetes, AWS ECS, or GCP Cloud Run directly from the CLI.',
      },
    ],
    techStackDetailed: [
      { name: 'Go', icon: '/assets/icons/docker.svg' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
      { name: 'Cobra', icon: '/assets/icons/nestjs.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
      { name: 'Python', icon: '/assets/icons/python.svg' },
      { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
    ],
    ctaTitle: 'Interested in the technical breakdown?',
    ctaDescription:
      "I've open-sourced Obsidian CLI and written detailed docs on the plugin architecture. Explore the repo or reach out to discuss a custom integration.",
  },
  {
    id: 4,
    slug: 'vortex-dashboard',
    title: 'Vortex Dashboard',
    description:
      'A real-time visualization platform for global logistics tracking. Built with WebGL for rendering thousands of active data points…',
    image: 'https://www.figma.com/api/mcp/asset/dc1c3b6c-aa40-440c-ae3b-bda8ff9da3f2',
    category: { label: 'FRONTEND', bgColor: 'rgba(0, 105, 112, 0.1)', textColor: '#006970' },
    techStack: ['React', 'Three.js', 'D3.js'],
    role: 'FRONTEND LEAD',
    period: 'Q4 2022 - Q3 2023',
    liveSiteUrl: '#',
    githubUrl: '#',
    detailImage: 'https://www.figma.com/api/mcp/asset/dc1c3b6c-aa40-440c-ae3b-bda8ff9da3f2',
    metrics: [
      { value: '50K+', label: 'DATA POINTS' },
      { value: '60fps', label: 'RENDER RATE' },
      { value: '99.5%', label: 'UPTIME' },
      { value: '<100ms', label: 'UPDATE LATENCY' },
    ],
    challenge:
      'Traditional SVG-based dashboards collapsed under the weight of real-time logistics data from thousands of active shipments. The existing solution rendered at under 5fps when tracking more than 500 concurrent nodes, making operational monitoring impossible.',
    architectureItems: [
      {
        icon: 'Map',
        title: 'WebGL Rendering Engine',
        description:
          'Custom Three.js scene graph with instanced mesh rendering for thousands of simultaneous shipment markers at 60fps.',
        highlighted: false,
      },
      {
        icon: 'Timeline',
        title: 'D3.js Data Pipeline',
        description:
          'Real-time data binding with D3 force simulations for animated route recalculation and traffic flow visualization.',
        highlighted: true,
      },
      {
        icon: 'Bolt',
        title: 'WebSocket Streaming',
        description:
          'Binary protocol WebSocket feeds for sub-100ms position updates, with client-side dead-reckoning for smooth interpolation.',
        highlighted: false,
      },
    ],
    capabilities: [
      {
        icon: 'Language',
        title: 'Global Heatmaps',
        description:
          'GPU-accelerated density heatmaps showing real-time shipment concentrations across all 195 countries.',
      },
      {
        icon: 'FilterAlt',
        title: 'Smart Filtering',
        description:
          'Multi-dimensional filtering by carrier, status, priority, and ETA with zero-latency spatial queries.',
      },
      {
        icon: 'Notifications',
        title: 'Alert System',
        description:
          'Configurable threshold alerts for delays, route deviations, and customs holds with push notification integration.',
      },
    ],
    techStackDetailed: [
      { name: 'React.js', icon: '/assets/icons/react.svg' },
      { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
      { name: 'Three.js', icon: '/assets/icons/javascript.svg' },
      { name: 'D3.js', icon: '/assets/icons/javascript.svg' },
      { name: 'Node.js', icon: '/assets/icons/nestjs.svg' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
    ],
    ctaTitle: 'Interested in the technical breakdown?',
    ctaDescription:
      "I've documented the WebGL rendering architecture and D3 data pipeline in detail. Reach out to explore a live demo or technical deep dive.",
  },
  {
    id: 5,
    slug: 'core-kernel-patch',
    title: 'Core Kernel Patch',
    description:
      'Contributions to the Linux kernel focusing on file system performance and security isolation for containerized environments.',
    image: 'https://www.figma.com/api/mcp/asset/01532707-a66d-417b-8968-019251b01b43',
    category: { label: 'SYSTEMS', bgColor: 'rgba(0, 165, 114, 0.1)', textColor: '#4edea3' },
    techStack: ['C', 'Assembly', 'KVM'],
    role: 'KERNEL CONTRIBUTOR',
    period: 'Q1 2021 - Q3 2021',
    githubUrl: '#',
    detailImage: 'https://www.figma.com/api/mcp/asset/01532707-a66d-417b-8968-019251b01b43',
    metrics: [
      { value: '35%', label: 'I/O THROUGHPUT' },
      { value: '3', label: 'PATCHES MERGED' },
      { value: '0', label: 'CVEs INTRODUCED' },
      { value: 'LTS', label: 'KERNEL TRACK' },
    ],
    challenge:
      'Container runtimes were suffering from excessive syscall overhead when enforcing namespace isolation under high I/O workloads. The bottleneck was in the VFS layer where redundant permission checks were being performed for each file operation.',
    architectureItems: [
      {
        icon: 'Memory',
        title: 'VFS Layer Optimization',
        description:
          'Patched the Linux VFS permission caching to reduce redundant capability checks for containerized namespaces.',
        highlighted: false,
      },
      {
        icon: 'Lock',
        title: 'Namespace Isolation',
        description:
          'Extended user namespace support with finer-grained capability delegation using a tiered permission model.',
        highlighted: true,
      },
      {
        icon: 'Speed',
        title: 'KVM Hypercall',
        description:
          'Custom KVM hypercall interface to offload container metadata queries to the hypervisor layer for near-zero overhead.',
        highlighted: false,
      },
    ],
    capabilities: [
      {
        icon: 'Security',
        title: 'Secure Isolation',
        description:
          'Hardened namespace boundaries preventing container escape via VFS path traversal and capability escalation.',
      },
      {
        icon: 'Speed',
        title: 'High Throughput',
        description:
          'Achieved 35% improvement in sequential read/write throughput for containerized filesystem operations.',
      },
      {
        icon: 'BugReport',
        title: 'Regression Testing',
        description:
          'Comprehensive kselftest suite with 200+ test cases covering edge cases in namespace permission delegation.',
      },
    ],
    techStackDetailed: [
      { name: 'C', icon: '/assets/icons/javascript.svg' },
      { name: 'Assembly', icon: '/assets/icons/javascript.svg' },
      { name: 'KVM', icon: '/assets/icons/docker.svg' },
      { name: 'Python', icon: '/assets/icons/python.svg' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
    ],
    ctaTitle: 'Interested in the technical breakdown?',
    ctaDescription:
      'All three kernel patches are merged and publicly documented on kernel.org. Feel free to review the code or reach out to discuss systems-level engineering.',
  },
  {
    id: 6,
    slug: 'signal-encrypt',
    title: 'Signal Encrypt',
    description:
      'A private messaging application utilizing end-to-end encryption with a custom implementation of the Double Ratchet…',
    image: 'https://www.figma.com/api/mcp/asset/b02b71bc-d561-40e5-8243-a232bcc742e3',
    category: { label: 'MOBILE', bgColor: 'rgba(227, 210, 255, 0.1)', textColor: '#742fe5' },
    techStack: ['React Native', 'WebCrypto', 'SQLite'],
    role: 'MOBILE LEAD',
    period: 'Q2 2023 - PRESENT',
    liveSiteUrl: '#',
    githubUrl: '#',
    detailImage: 'https://www.figma.com/api/mcp/asset/b02b71bc-d561-40e5-8243-a232bcc742e3',
    metrics: [
      { value: '10K+', label: 'ACTIVE USERS' },
      { value: 'E2EE', label: 'ENCRYPTION' },
      { value: '0', label: 'DATA BREACHES' },
      { value: '24/7', label: 'AVAILABILITY' },
    ],
    challenge:
      'Consumer messaging apps offered either strong encryption or a seamless user experience—rarely both. Implementing the Double Ratchet algorithm in a React Native environment required careful bridging of native cryptographic primitives without compromising cross-platform compatibility.',
    architectureItems: [
      {
        icon: 'Lock',
        title: 'Double Ratchet Protocol',
        description:
          'Custom TypeScript implementation of the Signal Double Ratchet algorithm using WebCrypto APIs for forward secrecy.',
        highlighted: false,
      },
      {
        icon: 'Storage',
        title: 'Encrypted SQLite Store',
        description:
          'SQLCipher-backed message storage with per-conversation key derivation and automatic key rotation on session refresh.',
        highlighted: true,
      },
      {
        icon: 'CloudQueue',
        title: 'Sealed Sender Delivery',
        description:
          'Server-blind message delivery using sealed sender envelopes, preventing metadata correlation by the infrastructure layer.',
        highlighted: false,
      },
    ],
    capabilities: [
      {
        icon: 'EnhancedEncryption',
        title: 'Forward Secrecy',
        description:
          'Each message uses a unique ephemeral key. Compromising one session key cannot decrypt past or future messages.',
      },
      {
        icon: 'Devices',
        title: 'Multi-Device Sync',
        description:
          'Secure multi-device message sync using the Sesame algorithm without ever exposing plaintext to the server.',
      },
      {
        icon: 'VisibilityOff',
        title: 'Metadata Privacy',
        description:
          'Sealed sender and private contact discovery ensure server operators cannot build social graphs from message metadata.',
      },
    ],
    techStackDetailed: [
      { name: 'React Native', icon: '/assets/icons/react.svg' },
      { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
      { name: 'WebCrypto', icon: '/assets/icons/javascript.svg' },
      { name: 'SQLite', icon: '/assets/icons/postgresql.svg' },
      { name: 'Node.js', icon: '/assets/icons/nestjs.svg' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
    ],
    ctaTitle: 'Interested in the technical breakdown?',
    ctaDescription:
      "I've written a detailed technical post on implementing the Double Ratchet in React Native. Reach out to explore the cryptographic architecture or request a security review.",
  },
];

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}
