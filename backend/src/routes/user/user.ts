import { Request, Response, Router } from "express";
import { supabase } from "@/utils/supabase-client";
import { AdminUserAttributes } from "@supabase/supabase-js";

const adminRouter: Router = Router();

adminRouter.post("/create/new-user", async (req:Request, res:Response)=>{
    try {
        const { id, password } = req.body;

        if(!id || !password){
            res.status(400).json({ message: "Credentials missing" });
            return;
        }

        const user:AdminUserAttributes = {
            email: id,
            password: password,
            role: "user",
            email_confirm: true
        }
        const { data, error } = await supabase.auth.admin.createUser(user);

        if(error){
            res.status(400).json({ message: error.message });
            return;
        }
        
        const user_id = data.user.id;

        res.status(200).json({ message : "User created successfully", user_id });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "server error" });
    }
})

adminRouter.post("/invalidate/user", async (req:Request, res:Response)=>{
    try {
        const { id } = req.body;
        if(!id){
            res.status(400).json({ message: "id missing" });
            return;
        }
        
        const { data, error } = await supabase.rpc("update_user_role", {"user_id": id, "new_role" : "archive"});
        
        if(error){
            console.log(error)
            res.status(400).json({ message: "Failed to update role of staff" });
            return
        }
        
        res.status(200).json({ message : "User archived successfully", data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "server error" });
    }
})

export default adminRouter;
