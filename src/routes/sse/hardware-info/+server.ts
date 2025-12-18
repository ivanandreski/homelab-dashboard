import { HARDWARE_INFO_HISTORY_ENTRIES } from '@/dummy-data/HardwareInfoData';
import { getHardwareInfo } from '@/service/HardwareMonitorService';
import { produce } from 'sveltekit-sse';

function delay(milliseconds: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds);
	});
}

export function POST() {
	return produce(async function start({ emit }) {
		while (true) {
			const hardwareInfo = getHardwareInfo();
			// TODO: Handle errors

			const { error } = emit('hardware-info', JSON.stringify(hardwareInfo));
			if (error) {
				return;
			}
			await delay(1000);
		}
	});
}
