import { getHardwareInfoHistory } from '@/service/HardwareMonitorService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		hardwareInfoHistoryEntries: getHardwareInfoHistory()
	};
};
