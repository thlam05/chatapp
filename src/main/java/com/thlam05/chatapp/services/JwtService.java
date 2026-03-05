package com.thlam05.chatapp.services;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.thlam05.chatapp.models.User;

@Service
public class JwtService {
    @Value("${jwt.secret-key}")
    private String secret;

    String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getId())
                .issuer("thlam05.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(3600, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(secret.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public JWTClaimsSet verifyToken(String token) {
        try {
            JWSObject jwsObject = JWSObject.parse(token);

            JWSVerifier verifier = new MACVerifier(secret.getBytes());
            if (!jwsObject.verify(verifier)) {
                throw new RuntimeException("Invalid JWT signature");
            }

            JWTClaimsSet claims = JWTClaimsSet.parse(
                    jwsObject.getPayload().toJSONObject());

            Date expirationTime = claims.getExpirationTime();
            if (expirationTime == null || expirationTime.before(new Date())) {
                throw new RuntimeException("JWT expired");
            }

            return claims;

        } catch (ParseException | JOSEException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }
}
