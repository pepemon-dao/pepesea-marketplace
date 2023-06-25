
const isSupportedChain = (chainId: number, pathname: string) => {
	if(pathname.startsWith('/bridge')) {
		// return (chainId === 906090 || chainId === 5)
		// disable withdrawal / deposit within the page if on wrong chain
		return true
	}

	if (pathname.startsWith('/store') || pathname === '/') {
		return (chainId === 1 || chainId === 4 || chainId === 56);
	}
	return (chainId === 1 || chainId === 4);
}

export default isSupportedChain;
