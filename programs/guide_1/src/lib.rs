use anchor_lang::prelude::*;

declare_id!("2pM5w81J4e2by24CR3fDnZhxxExyq1FsZfkLyw5NcTPJ");

#[program]
pub mod guide_1 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
