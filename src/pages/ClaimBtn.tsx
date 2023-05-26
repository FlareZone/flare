import {
	useClaimCSBStatus,
	useIsConnected,
	useWalletClaimCSBModal,
} from "@crossbell/connect-kit"

export function ClaimBtn() {
	const isWalletConnected = useIsConnected("wallet")
	const { isLoading, isEligibleToClaim, errorMsg } = useClaimCSBStatus()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isActive, show, hide } = useWalletClaimCSBModal()

	if (!isWalletConnected) return null

	return (
		<button disabled={isLoading || !isEligibleToClaim} onClick={show} className="font-400 text-sm">
			{isLoading
				? "Checking Eligibility"
				: isEligibleToClaim
				? "Claim $CSB"
				: errorMsg}
		</button>
	)
}
