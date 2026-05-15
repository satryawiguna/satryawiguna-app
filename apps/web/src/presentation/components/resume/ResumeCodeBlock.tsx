import { Box } from '@mui/material';

export function ResumeCodeBlock() {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        pt: '25px',
        pb: '26px',
        px: '25px',
        overflow: 'hidden',
      }}
    >
      {/* Window dots */}
      <Box sx={{ display: 'flex', gap: '8px', mb: '24px' }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'rgba(234, 179, 8, 0.5)',
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
          }}
        />
      </Box>

      {/* Code content */}
      <Box
        component="pre"
        sx={{
          fontFamily: 'Nimbus Mono PS, monospace',
          fontSize: '12px',
          lineHeight: '19.5px',
          m: 0,
          p: 0,
          overflow: 'hidden',
        }}
      >
        {/* class Developer { */}
        <Box component="div">
          <Box component="span" sx={{ color: '#60a5fa' }}>
            {'class '}
          </Box>
          <Box component="span" sx={{ color: '#fef08a' }}>
            Developer
          </Box>
          <Box component="span" sx={{ color: '#60a5fa' }}>
            {' {'}
          </Box>
        </Box>

        {/* // Available for collaboration */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#64748b' }}>
            {'// Available for collaboration'}
          </Box>
        </Box>

        {/* constructor() { */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#c084fc' }}>
            constructor
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {'() {'}
          </Box>
        </Box>

        {/* this.coffee = Infinity; */}
        <Box component="div" sx={{ pl: '48px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            this.
          </Box>
          <Box component="span" sx={{ color: '#67e8f9' }}>
            coffee
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {' = '}
          </Box>
          <Box component="span" sx={{ color: '#fdba74' }}>
            Infinity
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            ;
          </Box>
        </Box>

        {/* this.status = "Hiring"; */}
        <Box component="div" sx={{ pl: '48px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            this.
          </Box>
          <Box component="span" sx={{ color: '#67e8f9' }}>
            status
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {' = '}
          </Box>
          <Box component="span" sx={{ color: '#fdba74' }}>
            {'"Hiring"'}
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            ;
          </Box>
        </Box>

        {/* this.experience = "20+ years"; */}
        <Box component="div" sx={{ pl: '48px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            this.
          </Box>
          <Box component="span" sx={{ color: '#67e8f9' }}>
            experience
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {' = '}
          </Box>
          <Box component="span" sx={{ color: '#fdba74' }}>
            {'"20+ years"'}
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            ;
          </Box>
        </Box>

        {/* this.passion = true; */}
        <Box component="div" sx={{ pl: '48px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            this.
          </Box>
          <Box component="span" sx={{ color: '#67e8f9' }}>
            passion
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {' = '}
          </Box>
          <Box component="span" sx={{ color: '#60a5fa' }}>
            true
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            ;
          </Box>
        </Box>

        {/* } */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {'}'}
          </Box>
        </Box>

        {/* Empty line */}
        <Box component="div">&nbsp;</Box>

        {/* collaborate() { */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#c084fc' }}>
            collaborate
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {'() {'}
          </Box>
        </Box>

        {/* return "Let's build!"; */}
        <Box component="div" sx={{ pl: '48px' }}>
          <Box component="span" sx={{ color: '#60a5fa' }}>
            return{' '}
          </Box>
          <Box component="span" sx={{ color: '#fdba74' }}>
            {'"Let\'s build!"'}
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            ;
          </Box>
        </Box>

        {/* } */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {'}'}
          </Box>
        </Box>

        {/* Empty line */}
        <Box component="div">&nbsp;</Box>

        {/* solve(problem) { */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#c084fc' }}>
            solve
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            (
          </Box>
          <Box component="span" sx={{ color: '#fef08a' }}>
            problem
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {') {'}
          </Box>
        </Box>

        {/* return this.coffee-- && solution; */}
        <Box component="div" sx={{ pl: '48px' }}>
          <Box component="span" sx={{ color: '#60a5fa' }}>
            return{' '}
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            this.
          </Box>
          <Box component="span" sx={{ color: '#67e8f9' }}>
            coffee
          </Box>
          <Box component="span" sx={{ color: '#60a5fa' }}>
            {'-- && '}
          </Box>
          <Box component="span" sx={{ color: '#fef08a' }}>
            solution
          </Box>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            ;
          </Box>
        </Box>

        {/* } */}
        <Box component="div" sx={{ pl: '24px' }}>
          <Box component="span" sx={{ color: '#dae2fd' }}>
            {'}'}
          </Box>
        </Box>

        {/* } */}
        <Box component="div">
          <Box component="span" sx={{ color: '#60a5fa' }}>
            {'}'}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
