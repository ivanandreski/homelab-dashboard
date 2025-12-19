export const getRawMountData = () => `
Filesystem         1B-blocks          Used    Available Use% Mounted on
/dev/sdd1        68308869120    5916258304  58875846656  10% /mnt/data
/dev/sdd4        47436337152    7564460032  37429010432  17% /
/dev/sdc1      2000397791232 1393674985472 606722805760  70% /mnt/wdblue2tb_roms
/dev/sdb1      2000397791232 1348161867776 652235923456  68% /mnt/wdblue2tb_tvshow
/dev/sdd4        47436337152    7564460032  37429010432  17% /
/dev/sda2      4000768323584 3872614608896 128153714688  97% /mnt/wdred
`;

export const getRawHddModel = (diskName: string): string => {
	switch (diskName) {
		case 'sda':
			return 'WDC WD40EFRX-68N32N0';
		case 'sdb':
			return 'WDC WD20EZRZ-00Z5HB0';
		case 'sdc':
			return 'WDC WD20EZRZ-00Z5HB0';
		case 'sdd':
			return 'KINGSTON A400';
		default:
			return 'Unknown Model';
	}
};

export const getRawIsRotational = (diskName: string): string => {
	switch (diskName) {
		case 'sda':
			return '1';
		case 'sdb':
			return '1';
		case 'sdc':
			return '1';
		case 'sdd':
			return '0';
		default:
			return '0';
	}
};
