'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import type { CreateProjectRequest, UpdateProjectRequest } from 'shared-types';
import type { CreateBlogPostRequest, UpdateBlogPostRequest } from 'shared-types';
import { useCreateProject } from '@/presentation/hooks';
import { useCreateBlogPost } from '@/presentation/hooks';
import { ProjectDrawer } from './project/ProjectDrawer';
import { BlogDrawer } from './blog/BlogDrawer';

const statCards = [
  {
    label: 'Total Project Views',
    value: '42.8k',
    icon: '/assets/dashboard/icon-eye.svg',
    iconW: 38,
    iconH: 31,
    trend: '+12.5% from last month',
    trendColor: '#4edea3',
    barColor: '#22d3ee',
    barRight: '25.01%',
  },
  {
    label: 'Blog Engagement',
    value: '1,204',
    icon: '/assets/dashboard/icon-chat.svg',
    iconW: 36,
    iconH: 36,
    trend: '+5.2% interactions',
    trendColor: '#4edea3',
    barColor: '#4edea3',
    barRight: '50%',
  },
  {
    label: 'Site Traffic',
    value: '8.9k',
    icon: '/assets/dashboard/icon-chart.svg',
    iconW: 36,
    iconH: 29,
    trend: 'Stable last 24h',
    trendColor: '#94a3b8',
    barColor: '#d2bbff',
    barRight: '33.34%',
  },
];

const activityItems = [
  {
    icon: '/assets/dashboard/icon-code.svg',
    iconW: 16.667,
    iconH: 10,
    title: "New Commit: 'Obsidian UI Refactor'",
    time: '2m ago',
    description:
      "Pushed 12 changes to repository 'portfolio-v3'. Updated glassmorphism components…",
  },
  {
    icon: '/assets/dashboard/icon-comment.svg',
    iconW: 16.667,
    iconH: 16.667,
    title: "Comment on 'Future of Web Assembly'",
    time: '45m ago',
    description:
      'Alex J. says: "This breakdown of WASM performance is exactly what I was looking for.',
  },
  {
    icon: '/assets/dashboard/icon-deploy.svg',
    iconW: 15,
    iconH: 16.667,
    title: 'Production Deployment Success',
    time: '2h ago',
    description: 'Deployment ID #4829-X successfully pushed to Vercel production edge. All checks…',
  },
  {
    icon: '/assets/dashboard/icon-draft.svg',
    iconW: 15,
    iconH: 15,
    title: "Draft Saved: 'Mastering Framer Motion'",
    time: '5h ago',
    description:
      'Autosaved draft of new blog post. Current word count: 1,450. Estimated reading time: 7',
  },
];

const systemMetrics = [
  { label: 'CPU Load', value: '24%', valueColor: '#4edea3', barColor: '#4edea3', barRight: '75%' },
  {
    label: 'Memory Usage',
    value: '62%',
    valueColor: '#22d3ee',
    barColor: '#22d3ee',
    barRight: '40.01%',
  },
  {
    label: 'API Latency',
    value: '12ms',
    valueColor: '#34d399',
    barColor: '#34d399',
    barRight: '88%',
    glow: true,
  },
];

export function DashboardContent() {
  const [projectDrawerOpen, setProjectDrawerOpen] = useState(false);
  const [blogDrawerOpen, setBlogDrawerOpen] = useState(false);

  const closeProjectDrawer = useCallback(() => setProjectDrawerOpen(false), []);
  const closeBlogDrawer = useCallback(() => setBlogDrawerOpen(false), []);

  const { mutateAsync: createProject, isPending: isCreatingProject } =
    useCreateProject(closeProjectDrawer);
  const { mutateAsync: createBlogPost, isPending: isCreatingBlog } =
    useCreateBlogPost(closeBlogDrawer);

  const handleProjectSubmit = useCallback(
    async (values: CreateProjectRequest | UpdateProjectRequest) => {
      await createProject(values as CreateProjectRequest);
    },
    [createProject]
  );

  const handleBlogSubmit = useCallback(
    async (values: CreateBlogPostRequest | UpdateBlogPostRequest) => {
      await createBlogPost(values as CreateBlogPostRequest);
    },
    [createBlogPost]
  );

  return (
    <>
      <div
        className="flex flex-col gap-[16px] md:gap-[24px] p-[16px] md:p-[32px] lg:p-[48px] w-full"
        style={{ background: 'linear-gradient(90deg, rgb(6, 14, 32) 0%, rgb(6, 14, 32) 100%)' }}
      >
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] w-full">
          <div className="flex flex-col gap-[4px] md:gap-[8px]">
            <h1 className="font-['Space_Grotesk',sans-serif] font-bold text-[28px] md:text-[40px] leading-[36px] md:leading-[48px] text-[#dbfcff] tracking-[-2px]">
              Dashboard
            </h1>
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-[12px] bg-[#4edea3] shrink-0" />
              <span className="font-['Space_Grotesk',sans-serif] font-normal text-[12px] leading-[16px] text-[#4edea3]">
                System Online: All services operational
              </span>
            </div>
          </div>
          <div className="flex items-start gap-[15.99px]">
            <button
              onClick={() => setProjectDrawerOpen(true)}
              className="bg-transparent flex items-center gap-[7.99px] border border-[#00f0ff] px-[17px] py-[9px] rounded-[2px] text-[#00f0ff] font-['Space_Grotesk',sans-serif] font-normal text-[14px] leading-[20px] hover:bg-[rgba(0,240,255,0.05)] transition-colors cursor-pointer"
            >
              <Image src="/assets/dashboard/icon-plus.svg" alt="" width={8.167} height={8.167} />
              New Project
            </button>
            <button
              onClick={() => setBlogDrawerOpen(true)}
              className="border-0 relative flex items-center gap-[8px] px-[16px] py-[9px] rounded-[2px] bg-[#00f0ff] text-[#006970] font-['Space_Grotesk',sans-serif] font-normal text-[14px] leading-[20px] hover:bg-[#22d3ee] transition-colors shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <Image src="/assets/dashboard/icon-pen.svg" alt="" width={10.5} height={10.5} />
              Write Post
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto lg:grid-rows-[156.39px] gap-[16px] md:gap-[24px] w-full">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="backdrop-blur-[4px] bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[8px] p-[25px] flex flex-col gap-[8px] overflow-hidden self-start"
            >
              <div className="flex items-start justify-between pb-[16px] w-full">
                <div className="flex flex-col gap-[4px]">
                  <span className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px]">
                    {card.label}
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] font-medium text-[28px] text-white leading-[36.4px]">
                    {card.value}
                  </span>
                </div>
                <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} />
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] h-[4px] rounded-[12px] overflow-hidden relative w-full">
                <div
                  className="absolute inset-0 rounded-[12px]"
                  style={{ right: card.barRight, background: card.barColor }}
                />
              </div>
              <span
                className="font-['Courier_New',monospace] text-[10px] leading-[15px]"
                style={{ color: card.trendColor }}
              >
                {card.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[493px] gap-[16px] md:gap-[24px] w-full">
          {/* Activity feed - 8 cols */}
          <div className="lg:col-[1/span_8] backdrop-blur-[4px] bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[8px] overflow-hidden pb-[60px] pt-px px-px self-start w-full">
            <div className="flex items-center justify-between pb-[25px] pt-[24px] px-[16px] md:px-[24px] border-b border-[rgba(255,255,255,0.05)] w-full">
              <h3 className="font-['Space_Grotesk',sans-serif] font-normal text-[18px] text-[#dbfcff] tracking-[-0.45px] leading-[28px]">
                Recent Activity
              </h3>
              <button className="border-0 bg-transparent font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#64748b] text-center leading-[15px] hover:text-[#94a3b8] transition-colors cursor-pointer">
                View All Archive
              </button>
            </div>

            <div className="flex flex-col w-full">
              {activityItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-[16px] md:gap-[24px] px-[16px] md:px-[24px] ${
                    index === 0
                      ? 'p-[16px] md:p-[24px]'
                      : 'border-t border-[rgba(255,255,255,0.05)] pb-[24px] pt-[25px]'
                  }`}
                >
                  <div className="flex-shrink-0 w-[40px] h-[40px] rounded-[4px] bg-[#222a3d] border border-[rgba(255,255,255,0.1)] flex items-center justify-center p-px">
                    <Image src={item.icon} alt="" width={item.iconW} height={item.iconH} />
                  </div>
                  <div className="flex-[1_0_0] min-w-px flex flex-col gap-[4px]">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-['Space_Grotesk',sans-serif] font-normal text-[14px] text-white leading-[20px]">
                        {item.title}
                      </span>
                      <span className="font-['Courier_New',monospace] text-[10px] text-[#64748b] shrink-0 leading-[15px]">
                        {item.time}
                      </span>
                    </div>
                    <p className="font-['Inter',sans-serif] font-normal text-[12px] text-[#94a3b8] leading-[16px] overflow-hidden text-ellipsis">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - 4 cols */}
          <div className="lg:col-[9/span_4] flex flex-col gap-[16px] md:gap-[24px] self-start w-full">
            {/* System health */}
            <div className="backdrop-blur-[4px] bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[8px] p-[25px] flex flex-col gap-[24px] w-full">
              <h3 className="font-['Space_Grotesk',sans-serif] font-normal text-[14px] text-[#dbfcff] tracking-[0.7px] uppercase leading-[20px]">
                SYSTEM HEALTH
              </h3>
              <div className="flex flex-col gap-[24px] w-full">
                {systemMetrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-[8px] w-full">
                    <div className="flex items-start justify-between w-full pr-[0.01px]">
                      <span className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#94a3b8] leading-[15px]">
                        {metric.label}
                      </span>
                      <span
                        className="font-['Courier_New',monospace] text-[10px] leading-[15px]"
                        style={{ color: metric.valueColor }}
                      >
                        {metric.value}
                      </span>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] h-[6px] rounded-[12px] overflow-hidden relative w-full">
                      <div
                        className="absolute inset-0 rounded-[12px]"
                        style={{
                          right: metric.barRight,
                          background: metric.barColor,
                          boxShadow: metric.glow
                            ? '0px 0px 8px 0px rgba(78,222,163,0.5)'
                            : undefined,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.05)] w-full">
                <div className="pt-[25px]">
                  <div className="flex items-center gap-[11.99px]">
                    <Image src="/assets/dashboard/icon-server.svg" alt="" width={18} height={19} />
                    <div className="flex flex-col">
                      <span className="font-['Space_Grotesk',sans-serif] font-normal text-[12px] text-white leading-[16px]">
                        US-East Node Cluster
                      </span>
                      <span className="font-['Inter',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px]">
                        Active - Primary Region
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured project card */}
            <div className="relative backdrop-blur-[4px] bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.1)] rounded-[8px] h-[160px] overflow-hidden">
              <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/dashboard/active-project.png"
                  alt=""
                  className="absolute left-0 max-w-none w-full"
                  style={{ height: '184.39%', top: '-42.19%' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] to-[rgba(6,14,32,0)]" />
              <div className="absolute bottom-0 left-0 right-0 p-[24px] flex flex-col gap-[8px]">
                <span className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#22d3ee] leading-[15px]">
                  Featured Project
                </span>
                <span className="font-['Space_Grotesk',sans-serif] font-normal text-[14px] text-white leading-[20px]">
                  Neural Engine Visualization
                </span>
                <div className="flex items-start gap-[8px]">
                  <span className="font-['Courier_New',monospace] text-[8px] text-[#cbd5e1] bg-[rgba(255,255,255,0.1)] px-[8px] py-[2px] rounded-[2px] leading-[12px]">
                    WEBGL
                  </span>
                  <span className="font-['Courier_New',monospace] text-[8px] text-[#cbd5e1] bg-[rgba(255,255,255,0.1)] px-[8px] py-[2px] rounded-[2px] leading-[12px]">
                    REACT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectDrawer
        open={projectDrawerOpen}
        onClose={closeProjectDrawer}
        isSubmitting={isCreatingProject}
        onSubmit={handleProjectSubmit}
      />

      <BlogDrawer
        open={blogDrawerOpen}
        onClose={closeBlogDrawer}
        isSubmitting={isCreatingBlog}
        onSubmit={handleBlogSubmit}
      />
    </>
  );
}
