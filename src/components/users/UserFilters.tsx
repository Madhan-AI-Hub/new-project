import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useUsers } from '../../app/providers/UserProvider';
import { useAuth } from '../../app/providers/AuthProvider';
import { useDebounce } from '../../hooks/useDebounce';
import { canAddUser } from '../../utils/permissions';
import { ROLES, DEBOUNCE_DELAY } from '../../utils/constants';
import { Role } from '../../types';

interface UserFiltersProps {
  onAddUser: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ onAddUser }) => {
  const { authState } = useAuth();
  const { users, filters, sortConfig, setFilters, setSortConfig } = useUsers();
  
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, DEBOUNCE_DELAY);

  // Update filters when debounced search changes
  React.useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch, setFilters]);

  // Get unique cities
  const uniqueCities = React.useMemo(() => {
    const cities = users.map(u => u.city || '').filter(Boolean);
    return Array.from(new Set(cities)).sort();
  }, [users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
  };

  const handleCityChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFilters({ city: typeof value === 'string' ? value.split(',') : value });
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setFilters({ role: event.target.value as Role | '' });
  };

  const handleSortFieldChange = (event: SelectChangeEvent<string>) => {
    setSortConfig({ ...sortConfig, field: event.target.value as 'name' | 'company' });
  };

  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    setSortConfig({ ...sortConfig, order: event.target.value as 'asc' | 'desc' });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setFilters({ search: '', city: [], role: '' });
  };

  const hasActiveFilters = searchInput || filters.city.length > 0 || filters.role;

  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        {/* Search and Add Button Row */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchInput && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {canAddUser(authState.role) && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddUser}
              sx={{ minWidth: { xs: '100%', sm: 160 }, whiteSpace: 'nowrap' }}
            >
              Add User
            </Button>
          )}
        </Stack>

        {/* Filters and Sort Row */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <FilterListIcon sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }} />
          
          <FormControl sx={{ minWidth: { xs: '100%', sm: 150 } }} size="small">
            <InputLabel>City</InputLabel>
            <Select
              multiple
              value={filters.city}
              onChange={handleCityChange}
              label="City"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {uniqueCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: { xs: '100%', sm: 130 } }} size="small">
            <InputLabel>Role</InputLabel>
            <Select value={filters.role} onChange={handleRoleChange} label="Role">
              <MenuItem value="">All</MenuItem>
              <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
              <MenuItem value={ROLES.MANAGER}>Manager</MenuItem>
              <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: { xs: '100%', sm: 130 } }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortConfig.field} onChange={handleSortFieldChange} label="Sort By">
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="company">Company</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: { xs: '100%', sm: 130 } }} size="small">
            <InputLabel>Order</InputLabel>
            <Select value={sortConfig.order} onChange={handleSortOrderChange} label="Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleClearFilters}
              sx={{ minWidth: { xs: '100%', sm: 100 } }}
            >
              Clear Filters
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
