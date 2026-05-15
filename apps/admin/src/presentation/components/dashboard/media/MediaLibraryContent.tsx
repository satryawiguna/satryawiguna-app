'use client';

import { useState, useMemo } from 'react';
import type { Asset, AssetThumbnailMap } from 'shared-types';
import { mapMediaToAsset } from 'shared-types';
import { AssetDetailDrawer } from './AssetDetailDrawer';
import { useMedia } from '@/presentation/hooks';

const MEDIA_THUMBNAILS: AssetThumbnailMap = {
  image: '/assets/media/thumb-image.svg',
  video: '/assets/media/thumb-video.svg',
  document: '/assets/media/thumb-document.svg',
  audio: '/assets/media/thumb-audio.svg',
};

type FilterType = 'all' | 'image' | 'video' | 'document' | 'audio';

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'IMAGES', value: 'image' },
  { label: 'VIDEO', value: 'video' },
  { label: 'DOCUMENTS', value: 'document' },
  { label: 'AUDIO', value: 'audio' },
];

export function MediaLibraryContent() {
  const { media, isLoading, isError, isFetching, pagination, filters, setPage } = useMedia();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  // Map API data to Asset format
  const assets = useMemo(() => media.map((m) => mapMediaToAsset(m, MEDIA_THUMBNAILS)), [media]);

  // Client-side type filter
  const filteredAssets = useMemo(
    () => (filter === 'all' ? assets : assets.filter((a) => a.type === filter)),
    [assets, filter]
  );

  function handleAssetClick(asset: Asset) {
    setSelectedAsset((prev) => (prev?.id === asset.id ? null : asset));
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#060e20]">
      {/* ===== Scrollable Content Area ===== */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-[16px] md:gap-[24px] lg:gap-[32px] p-[16px] md:p-[24px] lg:p-[32px]">
          {/* Upload Zone */}
          <div className="relative bg-[#060e20] border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-[8px] overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(34,211,238,0.05)] opacity-0 pointer-events-none" />
            <div className="flex flex-col items-center justify-center p-[24px] md:p-[32px] lg:p-[42px] gap-[8px]">
              <div className="bg-[rgba(34,211,238,0.1)] rounded-[12px] w-[52px] h-[52px] md:w-[64px] md:h-[64px] flex items-center justify-center">
                <svg width="27.5" height="20" viewBox="0 0 28 20" fill="none">
                  <path
                    d="M22 8C22 3.58 18.42 0 14 0C9.58 0 6 3.58 6 8C2.69 8.6 0.1 11.42 0 14.75C-0.1 18.1 2.69 20.9 6 20H22C25.31 20 28 17.31 28 14C28 10.69 25.31 8 22 8Z"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 14V6M10 10L14 6L18 10"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center pt-[8px]">
                <p className="font-['Space_Grotesk',sans-serif] font-normal text-[14px] md:text-[16px] text-white leading-[20px] md:leading-[24px] text-center">
                  Drag and drop assets here
                </p>
              </div>
              <div className="flex flex-col items-center max-w-[384px] pb-[8px] md:pb-[16px]">
                <p className="font-['Inter',sans-serif] font-normal text-[12px] md:text-[14px] text-[#94a3b8] leading-[18px] md:leading-[20px] text-center px-[8px]">
                  Support for PNG, JPG, SVG, MP4, and PDF. Max file size 50MB.
                </p>
              </div>
              <button className="border-0 cursor-pointer bg-[#22d3ee] px-[18px] md:px-[24px] py-[8px] md:py-[10px] rounded-[2px] font-['Space_Grotesk',sans-serif] font-bold text-[11px] md:text-[12px] text-[#020617] tracking-[1.2px] uppercase leading-[16px]">
                SELECT FILES
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col gap-[16px] items-start">
            {/* Filter pills - wrap on mobile */}
            <div className="inline-flex flex-wrap items-center bg-[#222a3d] border border-[rgba(255,255,255,0.05)] p-[5px] rounded-[4px]">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`border-0 flex flex-col items-center justify-center px-[12px] md:px-[16px] py-[6px] cursor-pointer font-['Space_Grotesk',sans-serif] font-bold text-[11px] md:text-[12px] tracking-[1.2px] uppercase leading-[16px] transition-colors rounded-[6px] whitespace-nowrap ${
                    filter === opt.value
                      ? 'bg-[#22d3ee] text-[#020617]'
                      : 'bg-transparent text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* View toggle + divider + sort - wrap on mobile */}
            <div className="flex items-center flex-wrap gap-[12px]">
              <button
                onClick={() => setIsGridView(true)}
                className="border border-[rgba(255,255,255,0.05)] bg-[#222a3d] w-[36px] h-[36px] flex items-center justify-center cursor-pointer rounded-[2px] p-[9px] transition-colors"
                style={{ outline: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="6"
                    height="6"
                    rx="1"
                    stroke={isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="11"
                    y="1"
                    width="6"
                    height="6"
                    rx="1"
                    stroke={isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="1"
                    y="11"
                    width="6"
                    height="6"
                    rx="1"
                    stroke={isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="11"
                    y="11"
                    width="6"
                    height="6"
                    rx="1"
                    stroke={isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className="border border-[rgba(255,255,255,0.05)] bg-[#222a3d] w-[36px] h-[36px] flex items-center justify-center cursor-pointer rounded-[2px] p-[9px] transition-colors"
                style={{ outline: 'none' }}
              >
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="18"
                    height="3"
                    rx="1.5"
                    stroke={!isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="1"
                    y="6.5"
                    width="18"
                    height="3"
                    rx="1.5"
                    stroke={!isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="1"
                    y="12"
                    width="18"
                    height="3"
                    rx="1.5"
                    stroke={!isGridView ? '#22d3ee' : '#94a3b8'}
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
              <div className="flex items-center h-[24px] px-[8px]">
                <div className="bg-[rgba(255,255,255,0.1)] h-[24px] w-px" />
              </div>
              <button
                className="border border-[rgba(255,255,255,0.05)] bg-[#222a3d] flex items-center gap-[8px] px-[13px] py-[7px] rounded-[2px] cursor-pointer hover:opacity-80 transition-opacity"
                style={{ outline: 'none' }}
              >
                <svg width="10.5" height="7" viewBox="0 0 11 7" fill="none">
                  <path d="M0.5 0.5H10.5L5.5 6.5L0.5 0.5Z" fill="#94a3b8" />
                </svg>
                <span className="font-['Space_Grotesk',sans-serif] font-normal text-[12px] text-[#94a3b8] tracking-[1.2px] uppercase leading-[16px]">
                  DATE MODIFIED
                </span>
              </button>
            </div>
          </div>

          {/* Asset Grid / List */}
          {isLoading ? (
            isGridView ? (
              <SkeletonGrid />
            ) : (
              <SkeletonList />
            )
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 gap-[12px]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="1.5" />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="#f87171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-['Space_Grotesk',sans-serif] text-[14px] text-[#f87171]">
                Failed to load media
              </span>
            </div>
          ) : isGridView ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px] md:gap-[20px] lg:gap-x-[24px] lg:gap-y-[24px]">
              {filteredAssets.map((asset) => (
                <AssetGridCard
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  onClick={() => handleAssetClick(asset)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredAssets.map((asset) => (
                <AssetListRow
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  onClick={() => handleAssetClick(asset)}
                />
              ))}
            </div>
          )}

          {!isLoading && !isError && filteredAssets.length === 0 && (
            <div className="flex items-center justify-center py-12 md:py-16">
              <span className="font-['Space_Grotesk',sans-serif] text-[12px] md:text-[14px] text-[#64748b]">
                No assets found
              </span>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-[8px] pt-[8px]">
              <button
                disabled={filters.page <= 1}
                onClick={() => setPage(filters.page - 1)}
                className="border border-[rgba(255,255,255,0.1)] bg-[#222a3d] px-[12px] py-[6px] rounded-[2px] text-[#94a3b8] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-white transition-colors"
              >
                Prev
              </button>
              <span className="font-['Space_Grotesk',sans-serif] text-[12px] text-[#64748b]">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage(filters.page + 1)}
                className="border border-[rgba(255,255,255,0.1)] bg-[#222a3d] px-[12px] py-[6px] rounded-[2px] text-[#94a3b8] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-white transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Fetching indicator */}
          {isFetching && !isLoading && (
            <div className="flex items-center justify-center">
              <div className="w-[20px] h-[20px] border-2 border-[#22d3ee] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      <AssetDetailDrawer
        open={!!selectedAsset}
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}

/* ── Skeleton Components ──────────────────────────────────────── */

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px] md:gap-[20px] lg:gap-x-[24px] lg:gap-y-[24px]">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="backdrop-blur-[4px] bg-[#0f172a] border border-[rgba(255,255,255,0.1)] rounded-[8px] overflow-hidden animate-pulse"
        >
          <div className="h-[90px] sm:h-[100px] md:h-[107px] bg-[#131b2e]" />
          <div className="p-[12px] flex flex-col gap-[8px]">
            <div className="h-[14px] bg-[#1e293b] rounded w-3/4" />
            <div className="h-[10px] bg-[#1e293b] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-[16px] px-[16px] py-[12px] border-b border-[rgba(255,255,255,0.05)] animate-pulse"
        >
          <div className="w-[40px] h-[40px] rounded-[4px] bg-[#131b2e] shrink-0" />
          <div className="flex-1">
            <div className="h-[14px] bg-[#1e293b] rounded w-2/3" />
          </div>
          <div className="hidden sm:block w-[60px]">
            <div className="h-[12px] bg-[#1e293b] rounded" />
          </div>
          <div className="w-[60px]">
            <div className="h-[12px] bg-[#1e293b] rounded ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Asset Grid Card ──────────────────────────────────────────── */
function AssetGridCard({
  asset,
  isSelected,
  onClick,
}: {
  asset: Asset;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`cursor-pointer flex flex-col backdrop-blur-[4px] bg-[#0f172a] overflow-hidden rounded-[8px] group transition-shadow ${
        isSelected
          ? 'border-2 border-solid border-[#22d3ee] shadow-[0px_0px_20px_0px_rgba(0,219,233,0.1)]'
          : 'border border-solid border-[rgba(255,255,255,0.1)]'
      }`}
    >
      <CardThumbnail asset={asset} isSelected={isSelected} />
      <div className="p-[12px] flex flex-col gap-[4px] flex-shrink-0">
        <div className="overflow-hidden">
          <p
            className={`font-mono font-normal text-[12px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap ${
              isSelected ? 'text-white' : 'text-[#cbd5e1]'
            }`}
          >
            {asset.fileName}
          </p>
        </div>
        <div>
          <p className="font-['Inter',sans-serif] font-normal text-[10px] text-[#64748b] leading-[15px] tracking-[-0.5px] uppercase">
            {asset.size}
            {asset.dimensions ? ` \u2022 ${asset.dimensions}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Card Thumbnail ───────────────────────────────────────────── */
function CardThumbnail({ asset, isSelected }: { asset: Asset; isSelected: boolean }) {
  if (asset.type === 'image') {
    return (
      <div className="bg-black relative w-full z-[2] overflow-hidden">
        <div className="h-[140px] sm:h-[150px] md:h-[157px] w-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.thumbnailUrl}
            alt={asset.fileName}
            className="absolute left-0 top-0 w-full h-full object-contain"
            loading="lazy"
          />
          {isSelected && <div className="absolute inset-0 bg-[rgba(34,211,238,0.1)]" />}
          {!isSelected && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[rgba(0,0,0,0.4)] flex items-center justify-center gap-[8px]">
              <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.1)] rounded-[12px] w-[32px] h-[32px] flex items-center justify-center">
                <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
                  <path
                    d="M6.5 0.5C3 0.5 0.5 4.5 0.5 4.5C0.5 4.5 3 8.5 6.5 8.5C10 8.5 12.5 4.5 12.5 4.5C12.5 4.5 10 0.5 6.5 0.5Z"
                    stroke="white"
                    strokeWidth="1.2"
                  />
                  <circle cx="6.5" cy="4.5" r="1.8" stroke="white" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.1)] rounded-[12px] w-[32px] h-[32px] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M7 1L9 3L3 9H1V7L7 1Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}
          {isSelected && (
            <div className="absolute top-[8px] right-[8px] bg-[#22d3ee] rounded-[12px] w-[20px] h-[20px] flex items-center justify-center z-[10]">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="#020617"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (asset.type === 'video') {
    return (
      <div className="bg-[#131b2e] relative w-full z-[2] overflow-hidden">
        <div className="flex flex-col items-center justify-center pt-[25px] pb-[33px] relative">
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
            <rect x="1" y="5" width="24" height="22" rx="3" stroke="#22d3ee" strokeWidth="1.5" />
            <path
              d="M25 12L38 6V26L25 20V12Z"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute bottom-[8px] right-[8px] backdrop-blur-[2px] bg-[rgba(0,0,0,0.6)] px-[6px] py-[2px] rounded-[2px]">
            <span className="font-mono font-normal text-[10px] text-white leading-[15px]">
              02:45
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (asset.type === 'document') {
    return (
      <div className="bg-[#131b2e] relative w-full z-[2] overflow-hidden">
        <div className="flex flex-col items-center justify-center pt-[25px] pb-[33px] relative">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M8 4H24L34 14V36C34 37.1 33.1 38 32 38H8C6.9 38 6 37.1 6 36V6C6 4.9 6.9 4 8 4Z"
              stroke="#f87171"
              strokeWidth="1.5"
            />
            <path d="M24 4V14H34" stroke="#f87171" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-[8px] left-[8px] bg-[rgba(239,68,68,0.2)] px-[6px] py-[2px] rounded-[2px]">
            <span className="font-['Space_Grotesk',sans-serif] font-normal text-[10px] text-[#f87171] leading-[15px] tracking-[1px]">
              PDF
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (asset.type === 'audio') {
    return (
      <div className="bg-[#131b2e] relative w-full z-[2] overflow-hidden">
        <div className="flex flex-col items-center justify-center pt-[23px] pb-[23px] gap-[8px]">
          <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
            <circle cx="8" cy="40" r="5.5" stroke="#4edea3" strokeWidth="1.5" />
            <circle cx="24" cy="34" r="5.5" stroke="#4edea3" strokeWidth="1.5" />
            <path
              d="M13.5 40V12L29.5 6V34"
              stroke="#4edea3"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="bg-[rgba(78,222,163,0.1)] h-[4px] rounded-[12px] overflow-hidden w-[53px] relative">
            <div className="absolute top-0 bottom-0 left-0 right-[67%] bg-[#4edea3]" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/* ── Asset List Row ───────────────────────────────────────────── */
function AssetListRow({
  asset,
  isSelected,
  onClick,
}: {
  asset: Asset;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border-0 bg-transparent cursor-pointer flex items-center gap-[16px] px-[16px] py-[12px] text-left w-full transition-colors border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] ${
        isSelected ? 'bg-[rgba(34,211,238,0.05)]' : ''
      }`}
      style={{ outline: 'none' }}
    >
      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#0f172a] overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.thumbnailUrl}
          alt={asset.fileName}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-['Space_Grotesk',sans-serif] font-normal text-[13px] md:text-[14px] text-[#dbfcff] leading-[18px] md:leading-[20px] block truncate">
          {asset.fileName}
        </span>
      </div>
      <span className="hidden sm:inline font-['Space_Grotesk',sans-serif] font-normal text-[12px] text-[#64748b] leading-[16px] shrink-0">
        {asset.mimeType}
      </span>
      <span className="font-['Inter',sans-serif] font-normal text-[12px] text-[#64748b] leading-[16px] w-[80px] text-right shrink-0">
        {asset.size}
      </span>
    </button>
  );
}
